const express = require("express");
const { isAuth } =  require('../middlewares/isAuthentication.js')
const commentController = require("../controllers/commentController");
const router = express.Router();

router.use(isAuth)

router.route("/create").post(commentController.createComment);
router.route("/get").get(commentController.getComments);
router.route("/update").post(commentController.updateComment);
router.route("/delete").get(commentController.deleteComment);



module.exports = router;
