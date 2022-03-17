const User = require("../models/user");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

module.exports = function isAdmin(role) {
  return async function (req, res, next) {
    let token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //   console.log(decoded)
    if (decoded.role !== role) {
      return res
        .status(403)
        .send({ error: { status: 403, message: "Access denied. You are not Admin!" } });
    }
    next();
  };
};
