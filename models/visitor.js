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
        type: [{
            type: String,
            ref: 'User'
        }]
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
module.exports.getVisitors = function(query, callback) {
    Visitor.find({$and: [{isConnected: query.isConnected}, {group: query.group}]}, callback)
};

// Get Visitor
module.exports.getVisitorById = function(id, callback) {
    Visitor.findById(id, callback);
};

// Add Visitor
module.exports.addVisitor = function(visitor, callback) {
    visitor.save(callback)
};

// Update Visitor
module.exports.updateVisitor = function(id, visitor, options, callback){
    Visitor.findOneAndUpdate({_id: id}, visitor, options, callback);
};

// Toggle Connected
module.exports.toggleConected = function(id, isConnected, callback) {
    Visitor.findOneAndUpdate({_id : id}, {isConnected : !isConnected}, callback)
};

// Delete Visitor
module.exports.removeVisitor = function(id, callback) {
    Visitor.remove({_id: id}, callback);
};

module.exports.addActivity = function(id, activity, callback){
    Visitor.findById(id, (err, visitor) => {
        if(err) throw err
        visitor.activities.push(activity)
        visitor.save(callback)
    });
};

// Get observers
module.exports.retrieveObservers = function(id, callback) {
    Visitor.findOne({_id: id}).populate("observers").exec(callback);
};

module.exports.addObserver = function(id, observer, callback){
    Visitor.findById(id, (err, visitor) => {
        if(err) throw err
        visitor.observers.push(observer)
        visitor.save(callback)
    });
};
