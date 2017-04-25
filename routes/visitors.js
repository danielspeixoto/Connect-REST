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
router.post('/:group', (req, res, next) => {
    let newVisitor = new Visitor({
        name: req.body.name,
        observations: req.body.observations,
        phone: req.body.phone,
        age: req.body.age
    });

    Visitor.addVisitor(newVisitor, req.params.group, (err, group) => {
        let visitor = group.visitors;
        if(err){
            console.log(err.message)
            res.json({
                success: false,
                msg: "Algum erro ocorreu"
            });
        } else {
            res.json({
                visitor: {
                    id: visitor._id,
                    name: visitor.name,
                    observations: visitor.observations,
                    phone: visitor.phone,
                    age: visitor.age
                }
            });
        }
    });
});

// Get all visitors
router.get('/:group', (req, res) => {
    Visitor.getVisitors(req.params.group, function(err, group) {
        if(err) {
            console.log(err.message)
            res.json({
                success: false,
                msg: "Algum erro ocorreu"
            });
        } else if(group === null) {
            res.json([]);
        } else {
            res.json(group);
        }
    });
});

module.exports = router;
