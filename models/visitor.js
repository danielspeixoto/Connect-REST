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
    group: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    activities: {
        type: [String]
    },
    observers: {
        type: [String]
    },
    isConnected: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Visitor = module.exports = mongoose.model('Visitor', visitorSchema);
module.exports.visitorSchema = visitorSchema;


// Get Visitors
module.exports.getVisitors = function(groupName, callback) {
    Visitor.find({group: groupName}, callback)
};

// Get Visitor
module.exports.getVisitorById = function(id, callback){
    Visitor.findById(id, callback);
};

// Add Visitor
module.exports.addVisitor = function(visitor, groupName, callback) {
};

// Update Visitor
module.exports.updateVisitor = function(id, visitor, options, callback){
    var query = {_id: id};
    var update = {
        name : visitor.name,
        observations : visitor.observations,
        phone : visitor.phone,
        age : visitor.age,
        activities: visitor.activities,
        observers: visitor.observers,
        isConnected: visitor.isConnected
    };
    Visitor.findOneAndUpdate(query, update, options, callback);
};

// Toggle Connected
module.exports.addVisitor = function(visitor, groupName, callback) {

};

// Delete Visitor
module.exports.removeVisitor = function(id, callback){
    var query = {_id: id};
    Visitor.remove(query, callback);
};

