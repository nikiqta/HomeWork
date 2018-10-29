const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: {type: mongoose.SchemaTypes.String, required: true, unique: true},
    salt: {type: mongoose.SchemaTypes.String, required: true},
    hashedPass: {type: mongoose.SchemaTypes.String, required: true},
});

let User = mongoose.model('User' , userSchema);

module.exports = User;