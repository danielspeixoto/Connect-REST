User = require('./model/user');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

// Connect to Mongoose
mongoose.connect('mongodb://localhost/connect');
var db = mongoose.connection;


app.get('/', function(req, res){
	res.send('Please use /api/users');
});

app.get('/api/users', function(req, res) {
	User.getUsers(function(err, users) {
		res.json(users);
	});
});

app.get('/api/users/:_id', function(req, res) {
	User.getUserById(req.params._id, function(err, user) {
		res.json(user);
	});
});

app.post('/api/users', function(req, res) {
	var user = req.body;
	User.addUser(user, function(err, user) {
		res.json(user);
	});
});

app.put('/api/users/:_id', function(req, res) {
	var id = req.params._id;
	var user = req.body;
	User.updateUser(id, user, {}, function(err, user) {
		res.json(user);
	});
});

app.delete('/api/users/:_id', function(req, res) {
	var id = req.params._id;
	User.removeUser(id, function(err, user) {
		res.json(user);
	});
});
