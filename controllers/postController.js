const Post = require('../models/post')


//  CRUD - Create, Read, Update, Delete

exports.createPost = async(req, res, next) => {
  try {
    const { title, content } = req.body
    const post = await Post.create({ title, content })
  
    res.status(200).json({
      status: 'OK',
      data: post
    })
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
}


exports.getPosts = async(req, res, next) => {
  const posts = await Post.find({})

  res.status(200).json({
    status: 'OK',
    data: posts
  })
}

exports.deletePost = async(req, res, next) => {
  const { postId } = req.params
  
  await Post.findByIdAndDelete(postId);

  res.status(204).json({
    status: 'success',
    data: null,
  });
}

exports.changePost = async(req, res, next) => {
  const { postId } = req.params
  
  const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true });

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedPost,
    },
  });
}