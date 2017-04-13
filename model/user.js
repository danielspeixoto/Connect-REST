const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
	name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
    password: {
        type: String,
        required: true
    }
    group: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);

// Get Users
module.exports.getUsers = (callback, limit) => {
	User.find(callback).limit(limit);
}

// Get User
module.exports.getUserById = (id, callback) => {
	User.findById(id, callback);
}

// Add User
module.exports.addUser = (user, callback) => {
	User.create(user, callback);
}

// Update User
module.exports.updateUser = (id, user, options, callback) => {
	var query = {_id: id};
	var update = {
        name : user.name,
        username : user.username,
        password : user.password,
        group : user.group
	}
	User.findOneAndUpdate(query, update, options, callback);
}

// Delete User
module.exports.removeUser = (id, callback) => {
	var query = {_id: id};
	User.remove(query, callback);
}
