const express = require('express');
const userController = require('../controllers/user');
const usersRouter = express.Router();
const authController = require('../controllers/auth');

usersRouter.route('/signup')
    .post(userController.postUsers)

usersRouter.route('/login')
    .get(authController.isAuthenticated,userController.getUserInfo);

module.exports = usersRouter;