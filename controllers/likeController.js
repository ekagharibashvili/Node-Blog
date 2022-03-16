const Like = require("../models/like");

exports.makeLike = async (req, res, next) => {
    try {
      const like = await Like.create(req.body).populate("user");
  
      res.status(200).json({
        status: "OK",
        data: like,
      });
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  };
