const mongoose = require('mongoose');


// Add - author, genre 
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


const Post = mongoose.model('Post', postSchema);
// User => users
module.exports = Post;