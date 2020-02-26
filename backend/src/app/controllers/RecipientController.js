import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(request, response) {
    const { page = 1, limit = process.env.PAGE_LIMIT } = request.query;
    const offset = (page - 1) * limit;

    const recipients = await Recipient.findAndCountAll({
      limit,
      offset,
      order: ['id'],
    });

    const { rows, count } = recipients;

    return response.json({
      result: rows,
      pagination: {
        current: page,
        size: limit,
        last: Math.ceil(count / limit).toString(),
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
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Invalid data.' });
    }

    const recipient = await Recipient.create(request.body);

    return response.status(201).json(recipient);
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
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
