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

exports.getOneComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id)

    res.status(200).json({
      status: "OK",
      data: comment,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};


 exports.updateComment = async (req, res, next) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json({
      status: "OK",
      data: updatedComment,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};

