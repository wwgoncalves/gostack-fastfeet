import Sequelize, { Model } from 'sequelize';

class DeliveryProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
        name: {
          singular: 'delivery_problem',
          plural: 'delivery_problems',
        },
        tableName: 'delivery_problems',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Delivery, {
      foreignKey: 'delivery_id',
      as: 'delivery',
    });
  }
}

export default DeliveryProblem;
