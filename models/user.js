const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema( {
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', (callback) => {
    const user = this;

    if (!user.isModified('password')) return callback;

    bcrypt.genSalt(5, (err, salt) => {
        if (err) {
            return callback(err);
        }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                callback(err);
            }

            user.password = hash;
            callback();
        })
    })
});

UserSchema.methods.verifyPassword = (password, cb) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);