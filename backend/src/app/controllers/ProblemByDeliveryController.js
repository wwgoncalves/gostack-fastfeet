import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class ProblemByDeliveryController {
  async index(request, response) {
    const { page = 1, limit = process.env.PAGE_LIMIT } = request.query;
    const offset = (page - 1) * limit;

    const { id: deliveryId } = request.params;

    const deliveryProblems = await DeliveryProblem.findAndCountAll({
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
          where: {
            id: deliveryId,
          },
        },
      ],
      limit,
      offset,
      order: ['id'],
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

  async store(request, response) {
    const { id: deliveryId } = request.params;
    const { description: problemDescription } = request.body;

    if (!problemDescription) {
      return response.status(400).json({ error: 'Invalid data.' });
    }

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: deliveryId,
      description: problemDescription,
    });

    return response.status(201).json(deliveryProblem);
  }
}

export default new ProblemByDeliveryController();
