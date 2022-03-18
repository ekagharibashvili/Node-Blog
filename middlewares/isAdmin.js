module.exports = function isAdmin() {
  return (req, res, next) => {
    if (req.user[0].role !== "admin") {
      return res.status(403).send({
        error: { status: 403, message: "Access denied. You are not Admin!" },
      });
    }
    next();
  };
};
