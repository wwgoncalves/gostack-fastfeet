import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  // Handle the task to be executed
  async handle({ data }) {
    const { delivery, recipient, deliveryman } = data;

    return Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: `Entrega #${delivery.id} foi cancelada`,
      template: 'cancellation',
      context: {
        deliverymanName: deliveryman.name,
        recipientName: recipient.name,
        recipientAddress: `${recipient.street} (${recipient.city}, ${recipient.state})`,
        deliveryProduct: delivery.product,
      },
    });
  }
}

export default new CancellationMail();
