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
    Visitor.find({$and: [{isConnected: query.isConnected}, {group: query.group}]}, callback).sort({ _id : -1})
};

module.exports.searchVisitors = function (query, callback) {

    let json = {$and: []}
    if (query.age !== undefined) {
        json.$and.push({age: new RegExp('^' + query.age + '$', "i")})
    }
    if (query.isConnected !== undefined) {
        json.$and.push({isConnected: new RegExp('^' + query.isConnected + '$', "i")})
    }
    if (query.group !== undefined) {
        json.$and.push({group: new RegExp('^' + query.group + '$', "i")})
    }
    if (query.name !== undefined) {
        json.$and.push({name: new RegExp('^' + query.name + '$', "i")})
    }
    if (query.observations !== undefined) {
        json.$and.push({observations: new RegExp('^' + query.observations + '$', "i")})
    }
    if (query.phone !== undefined) {
        json.$and.push({phone: new RegExp('^' + query.phone + '$', "i")})
    }
    if (query.activities !== undefined) {
        json.$and.push({activities: new RegExp('^' + query.activities + '$', "i")})
    }
    if (query.observers !== undefined) {
        json.$and.push({observers: new RegExp('^' + query.observers + '$', "i")})
    }
    console.log(json)
    Visitor.find(json, callback).sort({_id: -1})
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

module.exports.delete = function(id, callback) {
    Visitor.remove({ _id: id }, callback);
};
