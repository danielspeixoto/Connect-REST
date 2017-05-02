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
module.exports.removeVisitor = function(id, callback){
    var query = {_id: id};
    Visitor.remove(query, callback);
};

module.exports.addActivity = function(id, activity, callback){
    Visitor.findById(id, (err, visitor) => {
        if(err) throw err
        console.log(activity)
        visitor.activities.push(activity)
        visitor.save(callback)
    });
};
