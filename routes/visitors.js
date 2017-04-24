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

    Visitor.addVisitor(newVisitor, req.param('group'), (err, visitor) => {
        if(err){
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
    Visitor.getVisitors(function(err, visitors) {
        res.json(visitors);
    });
})

module.exports = router;
