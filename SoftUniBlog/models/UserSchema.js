const mongoose = require('mongoose');
const encryption = require('./../util/encryption.js');

const userSchema = new mongoose.Schema({
    email: {type: mongoose.SchemaTypes.String, required: true, unique: true},
    hashedPass: {type: mongoose.SchemaTypes.String, required: true},
    fullName: {type: mongoose.SchemaTypes.String},
    salt: {type: mongoose.SchemaTypes.String, required: true},
    roles: [{type: mongoose.SchemaTypes.String}],
    userPushEach: {type: mongoose.SchemaTypes.Boolean, default: true},
    articles: [{type: mongoose.SchemaTypes.ObjectId}]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
},

    isAuthor: function (article) {
        if (!article) {
            return false;
        }

        let isAuthor = article.author.toString() === this.id;

        return isAuthor;
    },

    isInRole: function (role) {
        return this.roles.indexOf(role) !== -1;
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
           email: 'Admin',
           salt,
           hashedPass,
           roles: ['Admin']
        });
    }  catch (error) {
        console.log(error);
    }
  };

module.exports = User;