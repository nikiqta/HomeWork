const Team = require('./../models/TeamSchema.js');
const Project = require('./../models/ProjectSchema.js');
const User = require('./../models/UserSchema.js');

async function getProfileData(userId) {
    let projects = [];
    try {
        let user = await User.findById(userId).lean()
            .populate('teams');
        const projects = await Project.find().lean();
        user['projects'] = projects.slice(0);
        return user;
    } catch (e) {
        console.log(e)
    }
}

async function leaveTeam(teamId, userId) {
    try {
        await User.findByIdAndUpdate(userId, {$pull: {teams: {$in: [teamId]}}});
        await Team.findByIdAndUpdate(teamId, {$pull: {members: {$in: [userId]}}});
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
  getProfileData,
    leaveTeam
};