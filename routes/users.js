const express = require('express');
const userController = require('../controllers/user');

const usersRouter = express.Router();

usersRouter.route('/')
    .post(userController.postUsers)
    .get(userController.getUsers);

module.exports = usersRouter;