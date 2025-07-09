const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token required " });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      include: { model: Role, as: "role" },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role.name,
      roleId: user.role.id,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token " });
  }
}

module.exports = authenticate;
