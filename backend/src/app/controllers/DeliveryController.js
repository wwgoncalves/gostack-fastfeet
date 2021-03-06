import * as Yup from 'yup';
import { parseISO, getHours, format } from 'date-fns';
import { Op, literal, cast } from 'sequelize';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import DeliveryMail from '../jobs/DeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  constructor() {
    this.schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number()
        .nullable(true)
        .when('end_date', (end_date, field) =>
          end_date ? field.required() : field
        ),
      product: Yup.string().required(),
      canceled_at: Yup.date().nullable(true),
      start_date: Yup.date().nullable(true),
      end_date: Yup.date().nullable(true),
    });

    this.pickupHours = {
      initial: Number(process.env.PICKUP_INITIAL_HOUR),
      final: Number(process.env.PICKUP_FINAL_HOUR),
    };

    this.localTZ = format(new Date(), 'zzzz');

    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
  }

  async index(request, response) {
    const {
      page = 1,
      limit = process.env.PAGE_LIMIT,
      q: queryString = '',
      filter = 'none',
    } = request.query;
    const offset = (page - 1) * limit;

    const findAndCountAllOptions = {
      where: {
        product: {
          [Op.iLike]: `%${queryString}%`,
        },
      },
      limit,
      offset,
      order: ['id'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'city', 'state'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
      attributes: {
        include: [
          [
            cast(
              literal(
                '(SELECT COUNT(*) FROM "delivery_problems" WHERE "delivery_problems"."delivery_id" = "Delivery"."id")'
              ),
              'integer'
            ),
            'problems',
          ],
        ],
      },
    };

    if (filter === 'problems') {
      findAndCountAllOptions.where.id = {
        [Op.in]: literal('(SELECT delivery_id FROM delivery_problems)'),
      };
    }

    const deliveries = await Delivery.findAndCountAll(findAndCountAllOptions);

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
    const delivery = await Delivery.findByPk(request.params.id, {
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'city',
            'state',
            'street',
            'number',
            'complement',
            'cep',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
      attributes: {
        include: [
          [
            cast(
              literal(
                '(SELECT COUNT(*) FROM "delivery_problems" WHERE "delivery_problems"."delivery_id" = "Delivery"."id")'
              ),
              'integer'
            ),
            'problems',
          ],
        ],
      },
    });

    if (!delivery) {
      return response.status(400).json({ error: 'Delivery not found.' });
    }

    return response.json(delivery);
  }

  async store(request, response) {
    if (!(await this.schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Invalid data.' });
    }

    if (request.body.start_date) {
      const startDateHour = getHours(parseISO(request.body.start_date));

      if (
        startDateHour < this.pickupHours.initial ||
        startDateHour > this.pickupHours.final
      ) {
        return response.status(400).json({
          error: `Pickups are only available from ${this.pickupHours.initial}h to ${this.pickupHours.final}h (${this.localTZ}).`,
        });
      }
    }

    const recipient = await Recipient.findByPk(request.body.recipient_id);
    if (!recipient) {
      return response.status(400).json({ error: 'Recipient not found.' });
    }

    const deliveryman = await Deliveryman.findByPk(request.body.deliveryman_id);
    if (!deliveryman) {
      return response.status(400).json({ error: 'Deliveryman not found.' });
    }

    const delivery = await Delivery.create(request.body);

    // Emails the courier notifying them of a new delivery to pickup
    await Queue.add(DeliveryMail.key, {
      delivery,
      recipient,
      deliveryman,
      timeInfo: {
        pickupHours: this.pickupHours,
        localTZ: this.localTZ,
      },
    });

    return response.status(201).json(delivery);
  }

  async update(request, response) {
    if (!(await this.schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Invalid data.' });
    }

    if (request.body.start_date) {
      const startDateHour = getHours(parseISO(request.body.start_date));

      if (
        startDateHour < this.pickupHours.initial ||
        startDateHour > this.pickupHours.final
      ) {
        return response.status(400).json({
          error: `Pickups are only available from ${this.pickupHours.initial}h to ${this.pickupHours.final}h (${this.localTZ}).`,
        });
      }
    }

    const delivery = await Delivery.findByPk(request.params.id);
    if (!delivery) {
      return response.status(400).json({ error: 'Delivery not found.' });
    }

    const recipient = await Recipient.findByPk(request.body.recipient_id);
    if (!recipient) {
      return response.status(400).json({ error: 'Recipient not found.' });
    }

    const deliveryman = await Deliveryman.findByPk(request.body.deliveryman_id);
    if (!deliveryman) {
      return response.status(400).json({ error: 'Deliveryman not found.' });
    }

    const hasNewDeliveryman = delivery.deliveryman_id !== deliveryman.id;

    const deliveryUpdated = await delivery.update(request.body);

    if (hasNewDeliveryman) {
      // Emails the new courier notifying them of a new delivery to pickup
      await Queue.add(DeliveryMail.key, {
        delivery,
        recipient,
        deliveryman,
        timeInfo: {
          pickupHours: this.pickupHours,
          localTZ: this.localTZ,
        },
      });
    }

    return response.json(deliveryUpdated);
  }

  async delete(request, response) {
    const delivery = await Delivery.findByPk(request.params.id);

    if (!delivery) {
      return response.status(400).json({ error: 'Delivery not found.' });
    }

    await delivery.destroy();

    return response.status(204).end();
  }
}

export default new DeliveryController();
