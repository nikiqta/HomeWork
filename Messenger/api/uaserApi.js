
const User = require('./../models/UserSchema.js');

function userCheck(username) {
      return User.findOne({username: username});
}
function blockUser(user, otherUser) {
    return User.findByIdAndUpdate(user._id,
        {$push: {blockedUsers: otherUser}});
}

function unBlockUser(user, otherUser) {
    return User.findByIdAndUpdate(user._id,
        {$pull: {blockedUsers: {$in: [otherUser]}}});
}

module.exports = {
    userCheck,
    blockUser,
    unBlockUser
};