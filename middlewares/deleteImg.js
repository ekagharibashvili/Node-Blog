const fs = require("fs");
const { dirname } = require("path");
exports.deleteImg = (req, res, next) => {
  const appDir = dirname(require.main.filename);
  const pathDr = `${appDir}/images/${req.user.username}.jpg`;
  fs.unlink(pathDr, (err) => {
    if (err) throw err;
    console.log("File deleted!");
  });
  next();
};
