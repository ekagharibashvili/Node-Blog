const Comment = require("../models/comment");

exports.createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);

    res.status(200).json({
      status: "OK",
      data: comment,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({}).populate("user post");

    res.status(200).json({
      status: "OK",
      data: comments,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};
