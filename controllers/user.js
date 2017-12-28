const User = require('../models/user');

exports.postUsers = (req,res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save((err) => {
        if (err) {
            res.send(err);
        }

        res.json({message: "User created"});
    });
};

//should not be used in production apps
exports.getUsers = (req,res) => {
    User.find((err, users) => {
        if (err) {
            res.send(err);
        }

        res.json(users);
    });
};