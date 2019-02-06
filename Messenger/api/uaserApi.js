
const User = require('./../models/UserSchema.js');

function userCheck(username) {
      return User.findOne({username: username});
}

module.exports = {
    userCheck
};