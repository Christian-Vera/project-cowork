function authorizeSelfOrAdmin(req, res, next) {
  const { roleId, id: authUserId } = req.user;
  const targetId = parseInt(req.params.id, 10);

  if (roleId === 900 || authUserId === targetId) {
    return next();
  }

  return res.status(403).json({ error: "Access denied" });
}

module.exports = authorizeSelfOrAdmin;
