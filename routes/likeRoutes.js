const express = require("express");
const { isAuth } = require("../middlewares/isAuthentication.js");
const commentController = require("../controllers/likeController");
const router = express.Router();

router.use(isAuth);

router.route("/make").post(commentController.makeLike);
router.route("/get").get(commentController.getLikes);
router.route("/update/:id").put(commentController.updateLike);
router.route("/delete/:id").delete(commentController.deleteLike);

module.exports = router;
