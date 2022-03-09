const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "User must have a unique username"],
    required: [true, "User must have a username"],
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
  email: {
    type: String,
    required: [true, "User must have a email address"],
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  active: {
    type: Boolean,
    default: true,
  },
});

// return active users only
userSchema.pre("find", function () {
  this.find({ active: true });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
