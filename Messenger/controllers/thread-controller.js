const threadApi = require('./../api/threadApi.js');
const userApi = require('./../api/uaserApi.js');
const Thread = require('./../models/ThreadSchema.js');
const User = require('./../models/UserSchema.js');

module.exports = {
  findThread: async (req, res) => {
    const { username } = req.body;
    const user = req.user ? req.user : '';
    const isAdmin = user && user.isInRole('Admin');
    const searchedUser = await userApi.userCheck(username);

    if (!searchedUser) {
      res.render('home/index', {
        user,
        isAdmin,
        error: 'User does not exist in the system!'
      });
      return;
    }

    try {
      await threadApi
        .checkThreadExistence(user, searchedUser)
        .then(thread => {
          res.render('chat/chatroom');
        })
        .catch(err => console.log(err));
    } catch (e) {}
  }
};
