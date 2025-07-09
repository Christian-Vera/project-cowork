const { Booking } = require("../models");

function authorizeByOwnership(getResourceOwnerId) {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;
      const resource = await getResourceOwnerId(resourceId);

      if (!resource) {
        return res.status(404).json({ error: "Resource not found" });
      }

      if (req.user.roleId >= 900 || req.user.id === resource.userId) {
        return next();
      }

      return res
        .status(403)
        .json({ error: "Access denied: not the resource owner" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = authorizeByOwnership;
