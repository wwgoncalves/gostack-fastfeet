import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  constructor() {
    this.schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.number().required(),
      email: Yup.string().required(),
    });

    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
  }

  async index(request, response) {
    const { page = 1, limit = process.env.PAGE_LIMIT } = request.query;
    const offset = (page - 1) * limit;

    const deliverymen = await Deliveryman.findAndCountAll({
      limit,
      offset,
      order: ['id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    const { rows, count } = deliverymen;

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
    const deliveryman = await Deliveryman.findByPk(request.params.id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return response.status(400).json({ error: 'Deliveryman not found.' });
    }

    return response.json(deliveryman);
  }

  async store(request, response) {
    if (!(await this.schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Invalid data.' });
    }

    const deliveryman = await Deliveryman.create(request.body);

    return response.status(201).json(deliveryman);
  }

  async update(request, response) {
    if (!(await this.schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Invalid data.' });
    }

    const deliveryman = await Deliveryman.findByPk(request.params.id);

    if (!deliveryman) {
      return response.status(400).json({ error: 'Deliveryman not found.' });
    }

    const deliverymanUpdated = await deliveryman.update(request.body);

    return response.json(deliverymanUpdated);
  }

  async delete(request, response) {
    const deliveryman = await Deliveryman.findByPk(request.params.id);

    if (!deliveryman) {
      return response.status(400).json({ error: 'Deliveryman not found.' });
    }

    await deliveryman.destroy();

    return response.status(204).end();
  }
}

export default new DeliverymanController();
