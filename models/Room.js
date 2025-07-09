const { Model, DataTypes } = require("sequelize");

class Room extends Model {
  static initModel(sequelize) {
    Room.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        maxCapacity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        hasProjector: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        hasCallBoxes: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        boxesQty: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "room",
        timestamps: true,
      }
    );
    return Room;
  }
}

module.exports = Room;
