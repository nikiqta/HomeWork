const mongoose = require('mongoose');
const encryption = require('../util/encryption.js');

const userSchema = new mongoose.Schema({
    username: {type: mongoose.SchemaTypes.String, required: true, unique: true},
    hashedPass: {type: mongoose.SchemaTypes.String, required: true},
    firstName: {type: mongoose.SchemaTypes.String},
    lastName: {type: mongoose.SchemaTypes.String},
    salt: {type: mongoose.SchemaTypes.String, required: true},
    roles: [{type: mongoose.SchemaTypes.String}]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
  try {
      let users = await User.find();
      if(users.length > 0) return;
      const salt = encryption.generateSalt();
      const hashedPass = encryption.generateHashedPassword(salt, 'Admin');
      return User.create({
         username: 'Admin',
         salt,
         hashedPass,
         roles: ['Admin']
      });
  }  catch (error) {
      console.log(error);
  }
};
module.exports = User;