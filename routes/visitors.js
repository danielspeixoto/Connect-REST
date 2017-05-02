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
router.post('/:group', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    let newVisitor = new Visitor({
        name: req.body.name,
        observations: req.body.observations,
        phone: req.body.phone,
        age: req.body.age,
        group: req.params.group
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
router.get('/:group', (req, res) => {
    Visitor.getVisitors(req.params.group, function(err, visitors) {
        if(err) {
            console.log(err.message)
            res.sendStatus(500)
        } else {
            res.json(visitors);
        }
    });
});

router.put("/isConnected/:id", (req, res) => {
    Visitor.toggleConected(req.params.id, req.body.isConnected, function(err, visitor) {
        if(err) {
            console.log(err.message)
            res.sendStatus(500)
        } else {
            res.json(visitor);
        }
    });
});

module.exports = router;
