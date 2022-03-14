const Post = require("../models/post");

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    res.status(200).json({
      status: "OK",
      data: post,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};

// .populate('user post')

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate('user');

    res.status(200).json({
      status: "OK",
      data: posts,
    });
  } catch (err) {
    console.log('ERROR')
    console.log(JSON.stringify(err, null, 2));
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};

exports.changePost = async (req, res, next) => {
  const { postId } = req.params;
  const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      data: updatedPost,
    },
  });
};

exports.changeWithPutPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        data: updatedPost,
      },
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};
