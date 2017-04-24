/**
 * Created by daniel on 15/04/17.
 */

const mongoose = require('mongoose');
const User = require('./user')
const Group = require('./group')

// Visitor Schema
const visitorSchema = mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    observations: {
        type: String
    },
    phone: {
        type: Number
    },
    age: {
        type: Number
    },
    activities: {
        type: Object
    },
    observers: {
        type: Object
    }
});

const Visitor = module.exports = mongoose.model('Visitor', visitorSchema);

// Get Visitors
module.exports.getVisitors = function(callback, group, limit) {
    Visitor.find(callback).limit(limit);
}

// Get Visitor
module.exports.getVisitorById = function(id, callback){
    Visitor.findById(id, callback);
}

// Add Visitor
module.exports.addVisitor = function(visitor, group, callback) {
    // User.getUserByUsername("danielspeixoto" ,(err, user) => {
    //     console.log(user + '\n \n \n')
    //     user.children.create(visitor)
    // })
    var i = mongoose.model('Group')
    var mg = new i({name : group, children: [visitor]})
    mg.save(callback)
    //mg.children.create(visitor);
}

// Update Visitor
module.exports.updateVisitor = function(id, visitor, options, callback){
    var query = {_id: id};
    var update = {
        name : visitor.name,
        observations : visitor.observations,
        phone : visitor.phone,
        age : visitor.age,
        activities: visitor.activities,
        observers: visitor.observers
    }
    Visitor.findOneAndUpdate(query, update, options, callback);
}

// Delete Visitor
module.exports.removeVisitor = function(id, callback){
    var query = {_id: id};
    Visitor.remove(query, callback);
}

