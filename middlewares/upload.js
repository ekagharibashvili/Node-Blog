const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    try {
      cb(null, `${req.body.username}` + path.extname(file.originalname));
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({
          status: "Error",
          message: "User with this username already exists!",
        });
      }
    }
  },
});

exports.upload = multer({ storage: storage });
