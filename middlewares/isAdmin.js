const User = require("../models/user");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

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
