import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  // Handle the task to be executed
  async handle({ data }) {
    const { delivery, recipient, deliveryman, timeInfo } = data;

    return Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'A new delivery has been assigned to you',
      template: 'delivery',
      context: {
        deliverymanName: deliveryman.name,
        recipientName: recipient.name,
        recipientAddress: `${recipient.street} (${recipient.city}, ${recipient.state})`,
        deliveryProduct: delivery.product,
        pickupInitialHour: timeInfo.pickupHours.initial,
        pickupFinalHour: timeInfo.pickupHours.final,
        localTimezone: timeInfo.localTZ,
      },
    });
  }
}

export default new DeliveryMail();
