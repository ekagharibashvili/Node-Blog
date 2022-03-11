const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// create
exports.signup = async (req, res, next) => {
  try {
    // 1) Get user data
    let { username, password, email } = req.body;

    // Hash password and create auth token
    password = await bcrypt.hash(password, 12);

    const newUser = await User.create({ username, password, email });
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.status(200).json({
      status: "OK",
      data: newUser,
      token,
    });
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
    let { email, password } = req.body;

    // Check if the user already exists
    const user = await User.findOne({ email});

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

    const token = jwt.sign({ email}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

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
    const { active } = req.body;

    if (typeof active !== Boolean) {
      res.status(400).json({
        status: "Error",
        message: "You should provide correct status field",
      });
    } else {
      await User.findByIdAndUpdate(userId, { active });

      res.status(204).json({
        status: "OK",
        data: null,
      });
    }
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
