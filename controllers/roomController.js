const { Room } = require("../models");

async function getAll(req, res, next) {
  try {
    const room = await Room.findAll();
    return res.json(room);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) {
      const error = new Error("Room not found");
      error.status = 404;
      throw error;
    }
    return res.json(room);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { name, maxCapacity, hasProjector, hasCallBoxes, boxesQty } =
      req.body;

    const room = await Room.create({
      name,
      maxCapacity,
      hasProjector,
      hasCallBoxes,
      boxesQty,
    });

    return res.status(201).json(room);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const room = await Room.findByPk(req.params.id);

    if (!room) {
      const error = new Error("Room not found");
      error.status = 404;
      throw error;
    }

    const { name, maxCapacity, hasProjector, hasCallBoxes, boxesQty } =
      req.body;

    room.name = name ?? room.name;
    room.maxCapacity = maxCapacity ?? room.maxCapacity;
    room.hasProjector = hasProjector ?? room.hasProjector;
    (room.hasCallBoxes = hasCallBoxes ?? room.hasCallBoxes),
      (room.boxesQty = boxesQty ?? room.boxesQty);

    const updateRoom = await room.save();
    return res.json(updateRoom);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    deletedCount = await Room.destroy({
      where: { id: req.params.id },
    });

    if (!deletedCount) {
      return res.status(404).json({ error: "Room not found" });
    }

    return res.json({ message: "Room has been deleted." });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, update, remove };
