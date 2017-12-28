
const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const postController = require("../controllers/post");

router.route('/')
    .post(postController.createNewPost)
    .get(postController.getAllPosts);

router.route('/:id')
    .get(postController.getPostById)
    .put(postController.updatePost)
    .delete(postController.deletePost);

module.exports = router;