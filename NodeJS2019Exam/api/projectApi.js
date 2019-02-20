const Team = require('./../models/TeamSchema.js');
const Project = require('./../models/ProjectSchema.js');
const User = require('./../models/UserSchema.js');


function createProject(name, description) {
    return Project.create({
        name,
        description
    });
}

function getAllProjects() {
    return Project.find()
        .populate('team');
}

module.exports = {
    createProject,
    getAllProjects
};