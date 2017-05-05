/**
 * Created by danielspeixoto on 5/4/17.
 */

const express = require("express")
const router = express.Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")
const config = require("../config/database")
const User = require("../models/user")
const Visitor = require("../models/visitor")

// Observe
router.post("/", (req, res) => {
    User.addVisitor(req.body.username, req.body.visitor, (err, user) => {
        if(err) {
            console.log(err.message)
            res.sendStatus(500)
        } else {
            Visitor.addObserver(req.body.visitor, req.body.username, function(err, visitor) {
                if(err) {
                    console.log(err.message)
                    res.sendStatus(500)
                } else {
                    res.json(visitor)
                }
            });
        }
    })
})

module.exports = router