const { Booking, Room, User } = require("../models");
const transporter = require("../utils/mailer");

async function getAll(req, res, next) {
  try {
    const condition = req.user.roleId === 900 ? {} : { userId: req.user.id };

    const booking = await Booking.findAll({
      where: condition,
      include: [
        { model: Room, as: "room" },
        {
          model: User,
          as: "user",
          attributes: ["id", "firstname", "lastname", "email"],
        },
      ],
    });
    return res.json(booking);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        { model: Room, as: "room" },
        {
          model: User,
          as: "user",
          attributes: ["id", "firstname", "lastname", "email"],
        },
      ],
    });

    if (!booking) {
      const error = new Error("Booking not found");
      error.status = 404;
      throw error;
    }

    return res.json(booking);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const result = await Booking.create({
      roomId: req.body.roomId,
      date: req.body.date,
      userId: req.user.id,
    });

    const booking = await Booking.findByPk(result.id, {
      include: [
        {
          model: Room,
          as: "room",
        },
        {
          model: User,
          as: "user",
        },
      ],
    });

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TEST_RECEIVER,
      subject: "Confirmación de reserva Cowork",
      text: `Hola ${booking.user.firstname},\n\nTu reserva fue realizada con éxito.\n\nSala: ${booking.room.name}\nFecha: ${booking.date}\n\nGracias por usar nuestro sistema.\n\nCowork Team.`,
    };

    try {
      await transporter.sendMail(mailOption);
      console.log(
        "Correo enviado correctamente a:",
        process.env.EMAIL_TEST_RECEIVER
      );
    } catch (error) {
      console.error("Error al enviar el correo", error);
    }

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      const error = new Error("Booking not found");
      error.status = 404;
      throw error;
    }

    booking.roomId = req.body.roomId ?? booking.roomId;
    booking.date = req.body.date ?? booking.date;

    const result = await booking.save();
    return res.json(result);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const deletedBooking = await Booking.destroy({
      where: { id: req.params.id },
    });

    if (!deletedBooking) {
      const error = new Error("Booking not found");
      error.status = 404;
      throw error;
    }

    return res.json({ message: "Booking has been deleted." });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, update, remove };
