const User = require('../models/user');
const authController = require('./auth');

exports.postUsers = (req,res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save((err, savedUser) => {
        if (err) {
            return res.send(err);
        }

        res.send({username: savedUser.username, userId: savedUser._id});
    });
};

exports.getUserInfo = (req, res) => {
    res.send({username: req.user.username, userId: req.user._id});
};