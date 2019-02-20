const Team = require('./../models/TeamSchema.js');
const Project = require('./../models/ProjectSchema.js');
const User = require('./../models/UserSchema.js');

function createTeam(name) {
    return Team.create({
        name
    });
}

async function getAllTeams() {

    return await Team.find()
        .populate('projects')
        .populate('members');
}

module.exports = {
    createTeam,
    getAllTeams
};