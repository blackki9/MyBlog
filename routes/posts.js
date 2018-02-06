const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const postController = require("../controllers/post");
const authController = require('../controllers/auth');

router.route('/')
    .post(authController.isAuthenticated, postController.createNewPost)
    .get(postController.getAllPosts);

router.route('/:id')
    .get(postController.getPostById)
    .put(authController.isAuthenticated, postController.updatePost)
    .delete(authController.isAuthenticated, postController.deletePost);

module.exports = router;