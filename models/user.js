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
    },
    visitors: {
        type: [{
            type: String,
            ref: 'Visitor'
        }]
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

module.exports.getUsers = function(groupName, callback) {
    User.find({group: groupName}, callback)
};

module.exports.addVisitor = function(id, visitor, callback){
    User.findById(id, (err, user) => {
        if(err) throw err
        //TODO AVOID RESULT 200
        if(user.visitors.indexOf("visitor") !== -1) callback(Error(), null)
        else {
            user.visitors.push(visitor)
            user.save(callback)
        }
    });
};

module.exports.getVisitors = function(id, callback) {
    User.findOne({_id: id}).populate("visitors").exec(callback);
};

