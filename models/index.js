const { Sequelize } = require("sequelize");
const User = require("./User");
const Room = require("./Room");
const Role = require("./Role");
const Booking = require("./Booking");

const sequelizeOptions = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: process.env.DATABASE_DIALECT,
};

if (process.env.DATABASE_DIALECT === "postgres") {
  sequelizeOptions.dialectModule = require("pg");
}

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  sequelizeOptions
);

User.initModel(sequelize);
Room.initModel(sequelize);
Role.initModel(sequelize);
Booking.initModel(sequelize);

User.belongsTo(Role, {
  as: "role",
  foreignKey: { name: "roleId", allowNull: false },
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});
Role.hasMany(User, { foreignKey: { name: "roleId", allowNull: false } });

User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { as: "user", foreignKey: "userId" });

Room.hasMany(Booking, { foreignKey: "roomId" });
Booking.belongsTo(Room, { as: "room", foreignKey: "roomId" });

module.exports = {
  User,
  Room,
  Role,
  Booking,
  sequelize,
};
