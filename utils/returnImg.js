const fs = require("fs");
const { dirname } = require("path");
exports.returnImg = (req, res, next) => {
  const appDir = dirname(require.main.filename);
  const pathDr = `${appDir}/images/${req.user.username}.jpg`;
  fs.readFile(pathDr, function (err, data) {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "image/jpg" });
    res.end(data);
  });
};
