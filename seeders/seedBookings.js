const { Booking, User, Room } = require("../models");

async function seedBookings() {
  const user = await User.findOne();
  const room = await Room.findOne();

  if (!user || !room) {
    console.log(
      "No se pueden crear reservas sin al menos un usuario y una sala"
    );
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  const [booking, created] = await Booking.findCreateFind({
    where: {
      userId: user.id,
      roomId: room.id,
      date: today,
    },
    defaults: {
      userId: user.id,
      roomId: room.id,
      date: today,
    },
  });

  console.log(created ? "Reserva creada" : "Reserva ya existía");
}

module.exports = seedBookings;
