const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const bookingRoutes = require("./bookingRoutes");
const roomRoutes = require("./roomRoutes");
const userRoutes = require("./userRoutes");

router.use("/auth", authRoutes);
router.use("/bookings", bookingRoutes);
router.use("/rooms", roomRoutes);
router.use("/users", userRoutes);

module.exports = router;
