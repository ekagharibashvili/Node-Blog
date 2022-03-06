const express = require("express");

const postController = require("../controllers/postController");

const router = express.Router();

router.route("/create").post(postController.createPost);

router.route("/get").get(postController.getPosts);

router.route("/delete/:postId").delete(postController.deletePost);

router.route("/change/:postId").patch(postController.changePost);

router.route("/changeWithPut/:postId").put(postController.changeWithPutPost);

module.exports = router;
