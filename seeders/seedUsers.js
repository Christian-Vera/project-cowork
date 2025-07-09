const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

async function seedUsers() {
  for (let i = 0; i < 10; i++) {
    try {
      const hash = await bcrypt.hash("1234", 10);
      const email = faker.internet.email().toLowerCase();

      await User.create({
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email,
        password: hash,
        roleId: 100,
      });
      console.log(`Usuario creado: ${email}`);
    } catch (error) {
      console.error(
        "Error al crear usuario:",
        error.errors?.[0]?.message || error.message
      );
    }
  }

  const adminHash = await bcrypt.hash("admin1234", 10);

  try {
    const [admin, created] = await User.findOrCreate({
      where: { email: "admin@mail.com" },
      defaults: {
        firstname: "Admin",
        lastname: "User",
        password: adminHash,
        roleId: 900,
      },
    });
    if (created) {
      console.log("Admin creado");
    } else {
      console.log("Admin ya existía");
    }
  } catch (error) {
    console.error(
      "Error al crear admin:",
      error.errors?.[0]?.message || error.message
    );
  }
}

module.exports = seedUsers;
