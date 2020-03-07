import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async index(request, response) {
    const { page = 1, limit = process.env.PAGE_LIMIT } = request.query;
    const offset = (page - 1) * limit;

    const deliveryProblems = await DeliveryProblem.findAndCountAll({
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: [],
          where: {
            end_date: null,
            canceled_at: null,
          },
        },
      ],
      limit,
      offset,
      order: ['delivery_id', 'id'],
      attributes: ['delivery_id', 'id', 'description'],
    });

    const { rows, count } = deliveryProblems;

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
    const deliveryProblem = await DeliveryProblem.findByPk(request.params.id, {
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: [
            'recipient_id',
            'deliveryman_id',
            'product',
            'canceled_at',
            'start_date',
            'end_date',
          ],
        },
      ],
    });

    if (!deliveryProblem) {
      return response
        .status(400)
        .json({ error: 'Delivery problem was not found.' });
    }

    return response.json(deliveryProblem);
  }

  async delete(request, response) {
    const deliveryProblem = await DeliveryProblem.findByPk(request.params.id);

    if (!deliveryProblem) {
      return response
        .status(400)
        .json({ error: 'Delivery problem was not found.' });
    }

    const delivery = await Delivery.findByPk(deliveryProblem.delivery_id);
    const recipient = await Recipient.findByPk(delivery.recipient_id);
    const deliveryman = await Deliveryman.findByPk(delivery.deliveryman_id);

    const deliveryUpdated = await delivery.update({ canceled_at: new Date() });

    // Emails the courier notifying them of the cancellation of the delivery
    await Queue.add(CancellationMail.key, {
      delivery,
      recipient,
      deliveryman,
    });

    return response.json(deliveryUpdated);
  }
}

export default new DeliveryProblemController();
