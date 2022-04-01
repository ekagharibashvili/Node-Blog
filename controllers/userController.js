const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { sendMail } = require("../utils/email");
// create
exports.signup = async (req, res, next) => {
  try {
    // console.log(req.file);
    let { username, password, email, role } = req.body;
    let imageUrl = req.file.path;
    //  console.log(imageUrl);
    // Hash password and create auth token
    password = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password,
      email,
      role,
      imageUrl,
    });
    const token = jwt.sign(
      { username, password, email, role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    res.status(200).json({
      status: "OK",
      data: newUser,
      token,
    });
    sendMail;
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    if (err.code === 11000) {
      res.status(400).json({
        status: "Error",
        message: "User with this username already exists!",
      });
    } else if (!err.hasOwnProperty("errors")) {
      res.status(400).json({
        status: "Error",
        message: "Unexpected error occured while creating user",
      });
    } else {
      const errorMessagesArray = Object.values(err.errors).map(
        (err) => err.message
      );
      res.status(400).json({
        status: "Error",
        message: errorMessagesArray,
      });
    }
  }
};

exports.login = async (req, res, next) => {
  try {
    let { email, password, username, role } = req.body;

    // Check if the user already exists
    const user = await User.findOne({ email });
    console.log(user.password);
    if (!user) {
      return res.status(400).json({
        status: "Error",
        message: "User does not exists, register first",
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        status: "Error",
        message: "Incorrect username or password",
      });
    }

    const token = jwt.sign(
      { email, password, username, role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    res.status(200).json({
      status: "OK",
      data: user,
      token,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};

// read
exports.getAllUsers = async (req, res, next) => {
  try {
    // req.user.email
    const users = await User.find({});

    res.status(200).json({
      status: "OK",
      data: users,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    const errorMessagesArray = Object.values(err.errors).map(
      (err) => err.message
    );
    res.status(400).json({
      status: "Error",
      message: errorMessagesArray,
    });
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    // req.user.email
    const user = await User.findById(req.params.userId);
    res.status(200).json({
      status: "OK",
      data: user,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    const errorMessagesArray = Object.values(err.errors).map(
      (err) => err.message
    );
    res.status(400).json({
      status: "Error",
      message: errorMessagesArray,
    });
  }
};

// update
exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "OK",
      data: updatedUser,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    const errorMessagesArray = Object.values(err.errors).map(
      (err) => err.message
    );
    res.status(400).json({
      status: "Error",
      message: errorMessagesArray,
    });
  }
};

// delete active status
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndUpdate(userId, { $set: { active: false } });
    res.status(204).json({
      status: "OK",
      data: null,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    const errorMessagesArray = Object.values(err.errors).map(
      (err) => err.message
    );
    res.status(400).json({
      status: "Error",
      message: errorMessagesArray,
    });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    let { email, password, newPassword } = req.body;
    // find user
    const findUser = await User.findOne({ email });
    if (!(await bcrypt.compare(password, findUser.password))) {
      return res.status(400).json({
        status: "Error",
        message: "Incorrect currentPassword",
      });
    }

    // compare oldpassword to newPassword
    if (await bcrypt.compare(newPassword, findUser.password)) {
      return res.status(400).json({
        status: "Error",
        message: "new password cannot be the same as old",
      });
    }

    // hashed new password
    newPassword = await bcrypt.hash(newPassword, 12);
    // update in database
    const user = await User.findOneAndUpdate(email, {
      $set: { password: newPassword },
    });
    res.status(200).json({
      status: "OK",
      data: user,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    const errorMessagesArray = Object.values(err.errors).map(
      (err) => err.message
    );
    res.status(400).json({
      status: "Error",
      message: errorMessagesArray,
    });
  }
};

// update user image
exports.updateUserImage = async (req, res, next) => {
  try {
    const { username } = req.body;
    let newImageUrl = req.file.path;
    const newImage = await User.findOneAndUpdate(
      username,
      {
        $set: { imageUrl: newImageUrl },
      },
      { new: true }
    );
    res.status(200).json({
      status: "OK",
      data: newImage,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    const errorMessagesArray = Object.values(err.errors).map(
      (err) => err.message
    );
    res.status(400).json({
      status: "Error",
      message: errorMessagesArray,
    });
  }
};
