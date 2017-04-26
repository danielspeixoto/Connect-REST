const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const uniqueValidator = require('mongoose-unique-validator');

// User Schema
const userSchema = new mongoose.Schema({
	name: {
        type: String,
        required: true
    },
    _id: { //username
        type: String
    },
    password: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    permissions: {
        manageUsers: Boolean,
        organizeWork: Boolean
    }
});

const User = module.exports = mongoose.model('User', userSchema);
module.exports.userSchema = userSchema;

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.addUser = function(user, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) throw err;
            user.password = hash;
            user.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports.getUsers = function(callback, limit) {
    User.find(callback).limit(limit);
}
