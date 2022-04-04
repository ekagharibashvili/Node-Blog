const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  status: {
    type: String,
    enum: ["upvote", "downvote"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

likeSchema.pre(/^find/, function () {
  this.find({}).select("-__v");
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
