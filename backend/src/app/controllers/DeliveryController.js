import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliveryController {
  constructor() {
    this.schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number().nullable(true),
      product: Yup.string().required(),
      canceled_at: Yup.date().nullable(true),
      start_date: Yup.date().nullable(true),
      end_date: Yup.date().nullable(true),
    });

    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
  }

  async index(request, response) {
    const { page = 1, limit = process.env.PAGE_LIMIT } = request.query;
    const offset = (page - 1) * limit;

    const deliveries = await Delivery.findAndCountAll({
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
    const delivery = await Delivery.findByPk(request.params.id, {
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

    const delivery = await Delivery.create(request.body);

    return response.status(201).json(delivery);
  }

  async update(request, response) {
    if (!(await this.schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Invalid data.' });
    }

    const delivery = await Delivery.findByPk(request.params.id);

    if (!delivery) {
      return response.status(400).json({ error: 'Delivery not found.' });
    }

    const deliveryUpdated = await delivery.update(request.body);

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
