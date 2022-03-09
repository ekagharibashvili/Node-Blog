const User = require("../models/user");
// create
exports.createUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });

    res.status(200).json({
      status: "OK",
      data: user,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};

// read
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      status: "OK",
      data: users,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
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
      status: "success",
      data: {
        data: updatedUser,
      },
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};

// delete active status
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        data: updatedUser,
      },
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
};
