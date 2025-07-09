const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const authorizeSelfOrAdmin = require("../middlewares/authorizeSelfOrAdmin");

router.get("/:id", authenticate, authorizeSelfOrAdmin, userController.getById);
router.post("/", userController.create);
router.patch("/:id", authenticate, authorizeSelfOrAdmin, userController.update);
router.delete(
  "/:id",
  authenticate,
  authorizeSelfOrAdmin,
  userController.remove
);

module.exports = router;
