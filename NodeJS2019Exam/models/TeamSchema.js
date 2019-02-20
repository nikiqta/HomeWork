const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {type: mongoose.SchemaTypes.String, required: true},
    projects: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Project'}],
    members: [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;