const express = require('express');

const router = express.Router();

usersRouter.route('/')
    .post(userController.postUsers)
    .get(userController.getUsers);
