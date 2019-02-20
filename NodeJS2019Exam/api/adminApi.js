const Team = require('./../models/TeamSchema.js');
const Project = require('./../models/ProjectSchema.js');
const User = require('./../models/UserSchema.js');

function getAllUsers() {
    return User.find();
}

function getAllTeams() {
    return Team.find();
}

function getEmptyProjects() {
    return Project.find({
        team: undefined
    });
}

async function distributeUserIntoTeam(userId, teamId) {
    try {
        await Team.findByIdAndUpdate(teamId, {$addToSet: {members: userId}});
        await User.findByIdAndUpdate(userId, {$addToSet: {teams: teamId}});
    } catch (e) {
        console.log(e);
    }
         return true;
}

async function distributeTeamIntoProject(teamId, projectId) {
    try {
        await Team.findByIdAndUpdate(teamId, {$push: {projects: projectId}});
    } catch (e) {
        console.log(e);
    }
    return Project.findByIdAndUpdate(projectId, {team: teamId});
}

module.exports = {
    getAllUsers,
    getAllTeams,
    getEmptyProjects,
    distributeUserIntoTeam,
    distributeTeamIntoProject
};