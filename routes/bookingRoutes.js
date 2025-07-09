const bookingController = require("../controllers/bookingController");
const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const authorizeByOwnership = require("../middlewares/authorizeByOwnership");
const { Booking } = require("../models");

router.use(authenticate);

router.get("/", bookingController.getAll);
router.get(
  "/:id",
  authorizeByOwnership(async (id) => await Booking.findByPk(id)),
  bookingController.getById
);
router.post("/", bookingController.create);
router.patch(
  "/:id",
  authorizeByOwnership(async (id) => await Booking.findByPk(id)),
  bookingController.update
);
router.delete(
  "/:id",
  authorizeByOwnership(async (id) => await Booking.findByPk(id)),
  bookingController.remove
);

module.exports = router;
