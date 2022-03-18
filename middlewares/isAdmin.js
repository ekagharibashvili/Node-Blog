exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({
      error: { status: 403, message: "Access denied. You are not Admin!" },
    });
  }
  next();
};
