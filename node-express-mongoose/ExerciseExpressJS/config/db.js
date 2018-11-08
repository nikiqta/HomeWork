const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('./../models/UserSchema.js');

module.exports = config => {
    mongoose.connect('mongodb://localhost:27017/expressDb', {useNewUrlParser: true});
    const db = mongoose.connection;
    db.once('open', (err) => {
        if (err) throw err.message;

        User.seedAdminUser()
            .then(() => console.log('Database ready!'))
            .catch(err => console.warn(err.message));
    });
    db.on('error', reason => {
        console.log(reason);
    });
};