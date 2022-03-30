const express = require("express");
const userController = require("../controllers/userController.js");
const { isAuth } = require("../middlewares/isAuthentication");
const { isAdmin } = require("../middlewares/isAdmin");
const { upload } = require("../middlewares/upload");
const router = express.Router();

router.route("/signup").post(upload.single("imageUrl"), userController.signup);

router.route("/login").post(userController.login);

router.route("/get").get(isAuth, isAdmin, userController.getAllUsers);

router.route("/update/:userId").put(userController.updateUser);

router
  .route("/delete/:userId")
  .delete(isAuth, isAdmin, userController.deleteUser);

router.route("/getOne/:userId").get(userController.getOneUser);

//update password
router.route("/updatePassword").put(userController.updatePassword);

router.route("/updateUserImage/:userId").put(upload.single("newImageUrl"), userController.updateUserImage);


module.exports = router;
