/**
 * Created by danielspeixoto on 4/24/17.
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Visitor = require('../models/visitor');

// Register Visitor
router.post('/', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    console.log(req.body)
    let newVisitor = new Visitor({
        name: req.body.name,
        observations: req.body.observations,
        phone: req.body.phone,
        age: req.body.age,
        group: req.query.group
    });

    Visitor.addVisitor(newVisitor, (err, visitor) => {
        if(err){
            console.log(err.message)
            res.sendStatus(500)
        } else {
            res.json({
                visitor: {
                    id: visitor._id,
                    name: visitor.name,
                    observations: visitor.observations,
                    phone: visitor.phone,
                    age: visitor.age,
                    isConnected: visitor.isConnected
                }
            });
        }
    });
});

// Get all visitors
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Visitor.getVisitors(req.query, function(err, visitors) {
        if(err) {
            console.log(err.message)
            res.sendStatus(500)
        } else {
            res.json(visitors);
        }
    });
});


router.post('/searches', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log(req.body);
    Visitor.searchVisitors(req.body, function (err, visitors) {
        if (err) {
            console.log(err.message)
            res.sendStatus(500)
        } else {
            res.json(visitors);
        }
    });
});

router.get("/:id/observers", passport.authenticate('jwt', {session: false}), (req, res) => {
    Visitor.retrieveObservers(req.params.id, function(err, visitor) {
        if(err) {
            console.log(err.message)
            res.sendStatus(500)
        } else {
            res.json(visitor.observers);
        }
    });
});

router.put("/:id/observers", passport.authenticate('jwt', {session: false}), (req, res) => {
    Visitor.addObserver(req.params.id, req.body.username, function(err, visitor) {
        if(err) {
            console.log(err.message)
            res.sendStatus(500)
        } else {
            res.json(visitor);
        }
    });
});


router.put("/:id/isConnected", passport.authenticate('jwt', {session: false}), (req, res) => {
    Visitor.toggleConected(req.params.id, req.body.isConnected, function(err, visitor) {
        if(err) {
            console.log(err.message)
            res.sendStatus(500)
        } else {
            res.json(visitor);
        }
    });
});

router.put("/:id/activities", passport.authenticate('jwt', {session: false}), (req, res) => {
    Visitor.addActivity(req.params.id, req.body.activity, function(err, visitor) {
        if(err) {
            console.log(err.message)
            res.sendStatus(500)
        } else {
            res.json(visitor);
        }
    });
});

router.put("/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
    Visitor.delete(req.params.id, function(err) {
        if(err) {
            console.log(err.message)
            res.sendStatus(500)
        } else {
            res.json({});
        }
    });
});

module.exports = router;
