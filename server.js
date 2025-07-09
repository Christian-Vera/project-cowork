require("dotenv").config();

const express = require("express");
const app = express();
const routes = require("./routes");
const { sequelize } = require("./models");
const errorHandler = require("./middlewares/errorHandler");
const seedRoles = require("./seeders/seedRoles");
const seedUsers = require("./seeders/seedUsers");
const seedRooms = require("./seeders/seedRooms");
const seedBookings = require("./seeders/seedBookings");

app.use(express.json());
app.use(routes);
app.use(errorHandler);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    await seedRoles();
    await seedUsers();
    await seedRooms();
    await seedBookings();

    console.log("Base de datos sincronizada y datos iniciales cargados.");

    app.listen(process.env.APP_PORT, () => {
      console.log(
        `El servidor esta corriendo en el puerto ${process.env.APP_PORT}`
      );
    });
  } catch (err) {
    console.error("Error al conectar con la base de datos:", err.message);
    process.exit(1);
  }
})();
