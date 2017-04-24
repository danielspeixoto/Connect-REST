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
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        group: req.body.username,
        username: req.body.username,
        password: req.body.password,
        permissions: {
            "MANAGE_USERS": true
        },
    });

    User.addUser(newUser, (err, user) => {
        const password = user.password
        if(err){
            res.json({
                success: false,
                msg: "Algum erro ocorreu"
            });
        } else {
            const token = jwt.sign(user, config.secret, {
                expiresIn: 604800 // 1 week
            });
            res.json({
                user: {
                    token: 'JWT '+ token,
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    password: password, // Password without hash
                    permissions: user.permissions,
                    group: user.group

                }
            });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({
                success: false, msg: 'Usuário ou senha incorretos'
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT '+ token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        password: password, // Password without hash
                        permissions: user.permissions,
                        group: user.group

                    }
                });
            } else {
                return res.json({
                    success: false, msg: 'Usuário ou senha incorretos'
                });
            }
        });
    });
});

router.get('/get-all', (req, res) => {
    User.getUsers(function(err, users) {
        res.json(users);
    });
})

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;
