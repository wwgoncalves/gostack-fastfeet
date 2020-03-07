import * as Yup from 'yup';
import { Op } from 'sequelize';
import { parseISO, getHours, format, startOfDay, endOfDay } from 'date-fns';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class AssignmentController {
  constructor() {
    this.schema = Yup.object().shape(
      {
        start_date: Yup.date().when('end_date', {
          is: end_date => !end_date,
          then: Yup.date().required(),
        }),
        end_date: Yup.date()
          .when('start_date', {
            is: start_date => !start_date,
            then: Yup.date().required(),
          })
          .when('signature_id', {
            is: signature_id => signature_id,
            then: Yup.date().required(),
          }),
        signature_id: Yup.number().when('end_date', {
          is: end_date => end_date,
          then: Yup.number().required(),
        }),
      },
      [
        ['start_date', 'end_date'],
        ['end_date', 'signature_id'],
      ]
    );

    this.pickupHours = {
      initial: Number(process.env.PICKUP_INITIAL_HOUR),
      final: Number(process.env.PICKUP_FINAL_HOUR),
    };

    this.maxPickupsADay = Number(process.env.MAX_PICKUPS_A_DAY);

    this.localTZ = format(new Date(), 'zzzz');

    this.update = this.update.bind(this);
  }

  async index(request, response) {
    const {
      status = 'pending',
      page = 1,
      limit = process.env.PAGE_LIMIT,
    } = request.query;
    const offset = (page - 1) * limit;

    const { id: deliverymanId } = request.params;

    const deliveries = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: deliverymanId,
        canceled_at: null,
        end_date: status === 'pending' ? null : { [Op.ne]: null }, // 'pending' or 'finished' deliveries
      },
      limit,
      offset,
      order: ['id'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'city',
            'state',
            'cep',
          ],
        },
      ],
    });

    const { rows, count } = deliveries;

    return response.json({
      rows,
      returned: rows.length,
      total: count,
      pagination: {
        current: Number(page),
        size: Number(limit),
        last: Math.ceil(count / limit),
      },
    });
  }

  async show(request, response) {
    const { id: deliverymanId, delivery_id: deliveryId } = request.params;

    const delivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        deliveryman_id: deliverymanId,
      },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'city',
            'state',
            'cep',
          ],
        },
      ],
    });

    if (!delivery) {
      return response.status(400).json({ error: 'Delivery not found.' });
    }

    return response.json(delivery);
  }

  async update(request, response) {
    if (!(await this.schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Invalid data.' });
    }

    // Only one operation at a time: pickup "XOR" finish
    if (request.body.start_date && request.body.end_date) {
      return response.status(400).json({
        error: 'Invalid data. Only one operation at a time allowed.',
      });
    }

    const { id: deliverymanId, delivery_id: deliveryId } = request.params;

    const delivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        deliveryman_id: deliverymanId,
      },
    });

    if (!delivery) {
      return response.status(400).json({ error: 'Delivery not found.' });
    }

    let deliveryUpdated;

    // Delivery pickup
    if (request.body.start_date) {
      const parsedStartDate = parseISO(request.body.start_date);

      const startDateHour = getHours(parsedStartDate);

      if (
        startDateHour < this.pickupHours.initial ||
        startDateHour > this.pickupHours.final
      ) {
        return response.status(400).json({
          error: `Pickups are only available from ${this.pickupHours.initial}h to ${this.pickupHours.final}h (${this.localTZ}).`,
        });
      }

      /* Returns how many pickups were made in the "start_date" day.
       * The query excludes the delivery in question, in the event
       * so the deliveryman could fix the "start_date" hour, for example. */
      const dayPickups = await Delivery.count({
        where: {
          id: {
            [Op.ne]: deliveryId,
          },
          deliveryman_id: deliverymanId,
          canceled_at: null,
          start_date: {
            [Op.between]: [
              startOfDay(parsedStartDate),
              endOfDay(parsedStartDate),
            ],
          },
        },
      });

      if (dayPickups >= this.maxPickupsADay) {
        return response.status(403).json({
          error:
            'Operation forbidden due to restrictions on the number of pickups.',
        });
      }

      deliveryUpdated = await delivery.update({
        start_date: request.body.start_date,
      });
    }

    // Delivery finish
    if (request.body.end_date) {
      deliveryUpdated = await delivery.update({
        end_date: request.body.end_date,
        signature_id: request.body.signature_id,
      });
    }

    return response.json(deliveryUpdated);
  }
}

export default new AssignmentController();
