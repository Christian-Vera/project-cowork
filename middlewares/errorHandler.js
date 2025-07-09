function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Validation error",
      details: err.errors.map((e) => e.message),
    });
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      error: "Invalid Foreign Key",
      details: err.message,
    });
  }

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
}
module.exports = errorHandler;
