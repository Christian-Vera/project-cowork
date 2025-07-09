const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Role } = require("../models");

async function login(req, res, next) {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      include: { model: Role, as: "role" },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const compare = await bcrypt.compare(req.body.password, user.password);

    if (!compare) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, roleId: user.role.id },
      process.env.JWT_SECRET
    );
    return res.json({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = { login };
