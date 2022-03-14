const express = require("express");
const { isAuth } =  require('../middlewares/isAuthentication.js')

const commentController = require("../controllers/commentController");

const router = express.Router();

router.use(isAuth)

router.route("/create").post(commentController.createComment);
router.route("/get").get(commentController.getComments);



module.exports = router;