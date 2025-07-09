const { User, Role } = require("../models");
const bcrypt = require("bcryptjs");

async function getById(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "firstname", "lastname", "email"],
      include: { model: Role, as: "role", attributes: ["name"] },
    });

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    return res.json(user);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { firstname, lastname, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hash,
      roleId: 100,
    });

    return res.status(201).json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role.name,
    });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const { firstname, lastname, email, password } = req.body;

    user.firstname = firstname ?? user.firstname;
    user.lastname = lastname ?? user.lastname;
    user.email = email ?? user.email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updateUser = await user.save();

    return res.json({
      id: updateUser.id,
      firstname: updateUser.firstname,
      lastname: updateUser.lastname,
      email: updateUser.email,
      roleId: updateUser.roleId,
    });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    return res.json({ meesage: "User has been deleted." });
  } catch (err) {
    next(err);
  }
}

module.exports = { getById, create, update, remove };
