const { Room } = require("../models");

async function seedRooms() {
  const rooms = [
    {
      name: "Sala de Reuniones 1",
      maxCapacity: 10,
      hasProjector: true,
      hasCallBoxes: false,
      boxesQty: 0,
    },
    {
      name: "Sala de Trabajo Compartido",
      maxCapacity: 20,
      hasProjector: false,
      hasCallBoxes: true,
      boxesQty: 4,
    },
    {
      name: "Oficina Privada",
      maxCapacity: 4,
      hasProjector: false,
      hasCallBoxes: true,
      boxesQty: 2,
    },
    {
      name: "Sala de Conferencias",
      maxCapacity: 50,
      hasProjector: true,
      hasCallBoxes: false,
      boxesQty: 0,
    },
  ];

  for (const room of rooms) {
    await Room.findOrCreate({ where: { name: room.name }, defaults: room });
  }

  console.log("Sala Creada");
}

module.exports = seedRooms;
