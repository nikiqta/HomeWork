const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {type: mongoose.SchemaTypes.String, required: true},
    description: {type: mongoose.SchemaTypes.String, required: true, maxLength: 50},
    team: {type: mongoose.SchemaTypes.ObjectId, ref: 'Team'}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;