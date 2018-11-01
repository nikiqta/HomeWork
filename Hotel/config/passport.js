const passport = require('passport');
const LocalPassport = require('passport-local');

const User = require('./../models/UserSchema.js');

module.exports = () => {
    passport.use(new LocalPassport(async(username, password, done) => {
        const user = await User.find({username: username});
        if (!user) return done(null, false);
        if (!user.authenticated(password)) return done(null, false);
        return done(null, user);
    }));

    passport.serializeUser((user, done) => {
        if (user[0]) return done(null, user[0]._doc._id);
        if (user) return done(null, user._id);

    });

    passport.deserializeUser(async(id, done) => {
        const user = await User.find({_id: id});
        if (user) return done(null, user);
        return done(null, false);
    });
};