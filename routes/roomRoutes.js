const roomController = require("../controllers/roomController");
const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const authorizeByRole = require("../middlewares/authorizeByRole");

router.get("/", roomController.getAll);
router.get("/:id", roomController.getById);
router.post("/", authenticate, authorizeByRole(900), roomController.create);
router.patch("/:id", authenticate, authorizeByRole(900), roomController.update);
router.delete(
  "/:id",
  authenticate,
  authorizeByRole(900),
  roomController.remove
);

module.exports = router;
