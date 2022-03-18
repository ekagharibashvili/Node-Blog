const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
commentSchema.pre(/^find/, function () {
  this.find({}).select("-__v");
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
