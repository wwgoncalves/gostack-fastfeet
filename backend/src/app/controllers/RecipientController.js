import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  constructor() {
    this.schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().nullable(true),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
  }

  async index(request, response) {
    const { page = 1, limit = process.env.PAGE_LIMIT, q = '' } = request.query;
    const offset = (page - 1) * limit;

    const recipients = await Recipient.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
      limit,
      offset,
      order: ['id'],
    });

    const { rows, count } = recipients;

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
    const recipient = await Recipient.findByPk(request.params.id);

    if (!recipient) {
      return response.status(400).json({ error: 'Recipient not found.' });
    }

    return response.json(recipient);
  }

  async store(request, response) {
    if (!(await this.schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Invalid data.' });
    }

    const recipient = await Recipient.create(request.body);

    return response.status(201).json(recipient);
  }

  async update(request, response) {
    if (!(await this.schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Invalid data.' });
    }

    const recipient = await Recipient.findByPk(request.params.id);

    if (!recipient) {
      return response.status(400).json({ error: 'Recipient not found.' });
    }

    const recipientUpdated = await recipient.update(request.body);

    return response.json(recipientUpdated);
  }

  async delete(request, response) {
    const recipient = await Recipient.findByPk(request.params.id);

    if (!recipient) {
      return response.status(400).json({ error: 'Recipient not found.' });
    }

    await recipient.destroy();

    return response.status(204).end();
  }
}

export default new RecipientController();
