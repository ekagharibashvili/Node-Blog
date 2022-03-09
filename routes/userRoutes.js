const express = require("express");

const userController = require("../controllers/userController.js");

const router = express.Router();

router.route("/create").post(userController.createUser);

router.route("/get").get(userController.getAllUsers);

router.route("/get/:userId").get(userController.getUserById);

router.route("/update/:userId").put(userController.updateUser);

router.route("/delete/:userId").delete(userController.deleteUser);

module.exports = router;
