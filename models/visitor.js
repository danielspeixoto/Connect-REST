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
        type: [String]
    },
    observers: {
        type: [String]
    },
    isIntegrated: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Visitor = module.exports = mongoose.model('Visitor', visitorSchema);
module.exports.visitorSchema = visitorSchema;

const Group = require('./group');

// Get Visitors
//TODO Check if it is not retrieving users also
module.exports.getVisitors = function(groupName, callback) {
    Group.findById(groupName).populate("visitor", "visitor/name").exec(callback)
};

// Get Visitor
module.exports.getVisitorById = function(id, callback){
    Visitor.findById(id, callback);
};

// Add Visitor
module.exports.addVisitor = function(visitor, groupName, callback) {
    Group.getGroupById(groupName, (err, group) => {
        if(err) throw err;
        if(group === null) {
            group = Group({
                _id : groupName
            });
        }
        group.visitors.create(visitor)
        group.visitors.push(visitor);
        group.save(callback)
    })
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
        observers: visitor.observers
    };
    Visitor.findOneAndUpdate(query, update, options, callback);
};

// Delete Visitor
module.exports.removeVisitor = function(id, callback){
    var query = {_id: id};
    Visitor.remove(query, callback);
};

