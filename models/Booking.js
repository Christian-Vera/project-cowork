const { Model, DataTypes } = require("sequelize");

class Booking extends Model {
  static initModel(sequelize) {
    Booking.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        roomId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "booking",
        timestamps: true,
      }
    );
    return Booking;
  }
}

module.exports = Booking;
