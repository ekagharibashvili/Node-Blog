const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A post must have a title"],
  },
  content: {
    type: String,
    required: [true, "A post must have a content"],
  },
 user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  genre: {
    type: String,
    required: true,
    enum: [
      "Programming",
      "Novel",
      "Fantasy",
      "Historical",
      "Comics",
      "Horror",
      "Detective",
      "Romance",
      "Sci-Fi",
      "Thriller",
    ],
  },
 //  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  // comment: [
  //   {
  //     content: String,
  //     createdAt: {
  //       type: Date,
  //       default: Date.now(),
  //     },
  //   }
  // ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
