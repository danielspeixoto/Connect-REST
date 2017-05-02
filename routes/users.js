/**
 * Created by danielspeixoto on 4/17/17.
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register ADM
router.post('/', (req, res, next) => {
    let newUser = new User({
        _id: req.body.username,
        name: req.body.name,
        group: req.body.username,
        password: req.body.password,
        permissions: {
            manageUsers: true,
            organizeWork: true
        },
    });
    User.addUser(newUser, (err, user) => {
        if(err){
            console.log(err.message);
            res.sendStatus(500)
        } else {
            const token = jwt.sign(user, config.secret, {
                expiresIn: 604800 // 1 week
            });
            res.json({
                token: 'JWT '+ token,
                username: user._id,
                name: user.name,
                password: req.body.password,
                permissions: user.permissions,
                group: user.group
            });
        }
    });
});

// Authenticate
router.post('/login', (req, res, next) => {
    const _id = req.body.username;
    const password = req.body.password;

    User.getUserById(_id, (err, user) => {
        if(err) throw err;
        if(!user){
            res.sendStatus(404)
        } else {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    const token = jwt.sign(user, config.secret, {
                        expiresIn: 604800 // 1 week
                    });
                    res.json({
                        token: 'JWT '+ token,
                        username: user._id,
                        name: user.name,
                        password: password, // Password without hash
                        permissions: user.permissions,
                        group: user.group
                    });
                } else {
                    res.sendStatus(404)
                }
            });
        }
    });
});

module.exports = router;
