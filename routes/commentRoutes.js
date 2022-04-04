const express = require("express");
const { isAuth } =  require('../middlewares/isAuthentication.js')
const commentController = require("../controllers/commentController");
const router = express.Router();

router.use(isAuth)

router.route("/create").post(commentController.createComment);
router.route("/get").get(commentController.getComments);
router.route("/getOne/:id").get(commentController.getOneComment);
router.route("/update/:id").put(commentController.updateComment);
router.route("/delete/:id").delete(commentController.deleteComment);



module.exports = router;
