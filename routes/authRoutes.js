const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/tokens", authController.login);

module.exports = router;
