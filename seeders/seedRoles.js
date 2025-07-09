const { Role } = require("../models");

async function seedRoles() {
  const roles = [
    { id: 100, name: "user" },
    { id: 900, name: "admin" },
  ];

  for (const role of roles) {
    await Role.findOrCreate({
      where: { id: role.id },
      defaults: { name: role.name },
    });
  }

  console.log("Roles seeded");
}

module.exports = seedRoles;
