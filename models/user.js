const mongoose = require("mongoose");

const validator = require("validator");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "User must have a unique username"],
    minlength: [3, "Username must include at least three characters"],
    maxlength: [20, "Username must include maximum twenty characters"],
    required: [true, "User must have a username"],
  },
  password: {
    type: String,
    unique: [true, "User must have a unique password"],
    minlength: [6, "Password must include at least six characters"],
    required: [true, "User must have a password"],
    select: false,
  },
  email: {
    type: String,
    unique: [true, "User must have a unique email address"],
    required: [true, "User must have a email address"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
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
userSchema.pre(/^find/, function () {
  this.find({ active: true }).select("-__v");
});

const User = mongoose.model("User", userSchema);

module.exports = User;
