const Thread = require('./../models/ThreadSchema.js');
const User = require('./../models/UserSchema.js');

async function checkThreadExistence(currentUser, searchedUser) {
    const users = [currentUser.username, searchedUser.username];
    const thread = await Thread.findOne({
        users: {
            $all: [currentUser.username, searchedUser.username]
        }
    });


    if (thread) return thread;
    else return Thread.create({users: users});
}

function findThread(currentUser, searchedUser) {
    return Thread.findOne({
        users: {
            $all: [currentUser.username, searchedUser.username]
        }
    });
}

function getAllThreads() {
    return Thread.find();
}

function removeThread(id) {
    return Thread.findByIdAndRemove(id);
}

module.exports = {
    checkThreadExistence,
    findThread,
    getAllThreads,
    removeThread
};
