const Like = require("../models/like");

exports.makeLike = async (req, res, next) => {
  try {
    const like = await Like.create(req.body).populate("user post");

    res.status(200).json({
      status: "OK",
      data: like,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};

exports.getLikes = async (req, res, next) => {
  try {
    const likes = await Like.find({}).populate("user post");

    res.status(200).json({
      status: "OK",
      data: likes,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};

exports.updateLike = async (req, res, next) => {
  try {
    const like = await Like.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("user post");
    res.status(200).json({
      status: "OK",
      data: like,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};

exports.deleteLike = async (req, res, next) => {
  try {
    await Like.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "OK",
      data: null,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};
