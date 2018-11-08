const mongoose = require('mongoose');
const encryption = require('./../utilities/encryption');

const userSchema = new mongoose.Schema({
    username: {type: mongoose.SchemaTypes.String, required: true, unique: true},
    firstName: {type: mongoose.SchemaTypes.String, required: true},
    lastName: {type: mongoose.SchemaTypes.String, required: true},
    salt: {type: mongoose.SchemaTypes.String, required: true},
    hashedPass: {type: mongoose.SchemaTypes.String, required: true},
    roles: [{type: mongoose.SchemaTypes.String}]
});

userSchema.method({
    authenticated: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {

    try {
        const users = await User.find();
        if (users.length > 0) return;

        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, 'Azobi4aMMa4ibozA');
        return User.create({
            username: 'nedelchoAdmin',
            firstName: 'Nedelcho',
            lastName: 'Karageorgiev',
            salt,
            hashedPass,
            roles: ['Admin']
        });
    } catch (err) {
        throw err.message;
    }
};

module.exports = User;
