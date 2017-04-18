/**
 * Created by daniel on 15/04/17.
 */

const mongoose = require('mongoose');

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

    },
    observers: {
    }
});

const Visitor = module.exports = mongoose.model('Visitor', visitorSchema);

// Get Visitors
module.exports.getVisitors = function(callback, limit) {
    Visitor.find(callback).limit(limit);
}

// Get Visitor
module.exports.getVisitorById = function(id, callback){
    Visitor.findById(id, callback);
}

// Add Visitor
module.exports.addVisitor = function(visitor, callback) {
    Visitor.create(visitor, callback);
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

