const Thread = require('./../models/ThreadSchema.js');
const User = require('./../models/UserSchema.js');

async function checkThreadExistence(currentUser, searchedUser) {
  const users = [currentUser.username, searchedUser.username];
  const threads = await Thread.find();

  if (threads) {
    for (const thread of threads) {
      if (
        thread.users.includes(currentUser.username) &&
        thread.users.includes(searchedUser.username)
      ) {
        return thread;
      }
    }
  }
  return Thread.create({ users: users });
}

module.exports = {
  checkThreadExistence
};
