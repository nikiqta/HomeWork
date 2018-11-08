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

const UserSchema = mongoose.model('User', userSchema);

UserSchema.seedAdminUser = async () => {

    try {
        const users = await UserSchema.find();
        if (users.length > 0) return;

        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, '123');
        return UserSchema.create({
            username: 'nik',
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

module.exports = UserSchema;