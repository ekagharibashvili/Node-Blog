const express = require("express");
const { isAuth } = require("../middlewares/isAuthentication.js");
const commentController = require("../controllers/likeController");
const router = express.Router();

router.use(isAuth);

router.route("/make").post(commentController.makeLike);

module.exports = router;
