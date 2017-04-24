/**
 * Created by danielspeixoto on 4/24/17.
 */

const mongoose = require('mongoose');

// Group Schema
const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required : true
    }
});

const Group = module.exports = mongoose.model('Group', groupSchema);



// Get Groups
module.exports.getGroups = function(callback, limit) {
    Group.find(callback).limit(limit);
}

// Get Group
module.exports.getGroupById = function(id, callback){
    Group.findById(id, callback);
}

// Add Group
module.exports.addGroup = function(group, callback) {
    Group.create(group, callback);
}

// Update Group
module.exports.updateGroup = function(id, group, options, callback){
    var query = {_id: id};
    var update = {
        name : group.name,
    }
    Group.findOneAndUpdate(query, update, options, callback);
}

// Delete Group
module.exports.removeGroup = function(id, callback){
    var query = {_id: id};
    Group.remove(query, callback);
}

