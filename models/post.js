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
  author: {
    type: String,
    required: [true, "A post must have a author"],
  },
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
