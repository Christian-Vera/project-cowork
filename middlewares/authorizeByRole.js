function authorizeByRole(minRoleId) {
  return (req, res, next) => {
    if (!req.user || req.user.roleId < minRoleId) {
      return res
        .status(403)
        .json({ error: "Access denied: insufficient permissions" });
    }
    next();
  };
}

module.exports = authorizeByRole;
