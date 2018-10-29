const passport = require('passport');
const LocalPassport = require('passport-local');

const encryption = require('./../utils/encryption.js');
const User = require('./../models/UserSchema.js');
const Meme = require('./../models/MemeSchema.js');

passport.use(new LocalPassport(async(username, password, done) => {
    let user = await User.find({username: username});
    if (user !== undefined){
        const hashedPass = encryption.generateHashedPassword(user[0]._doc.salt, password);
        if (user[0]._doc.hashedPass === hashedPass) {
            return done(null, user);
        }
    }
    return done(null, false);
}));

passport.serializeUser((user, done) => {
    if (user[0]) return done(null, user[0]._doc._id);
    if (user) return done(null, user._id);

});

passport.deserializeUser(async(id, done) => {
    let user = await User.find({_id: id});
    if (user) return done(null, user);
    return done(null, false);
});


module.exports = {
    getLogin: (req, res) => {
        const message = req.session.message;
        req.session.message = '';
        res.render('login', {
            message,
            inputData: req.session.inputData,
        });
    },

    postLogin: (req, res) => {
        req.session.message = 'Login Successful!';
        return res.redirect('/allMemes/:page=1');
    },

    getRegister: (req, res) => {
        const message = req.session.message;
        req.session.message = '';
        res.render('register', {
            message,
            inputData: req.session.inputData,
        });
    },

    postRegister: async (req, res) => {
        let {
            username,
            password,
            repPass
        } = req.body;

        let user = await User.find({username: username});

        if (password !== repPass) return error('Passwords do not match!');
        if (user.length > 0) return error('The username is taken');

        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, password);
        const newUser = new User({
           username,
           salt,
           hashedPass
        });
       await newUser.save();
       req.login(newUser._doc, err => {
           if (err) return error('Something went wrong! Please try again.');
           req.session.message = 'Registration Successful!';
           return res.redirect('/allMemes/:page=1');
       });

        function error(message) {
            req.session.inputData = {
                username,
                password,
                repPass
            };
            req.session.message = message;
            return res.redirect('/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        req.session.message = "Logout Successful!";
        const message = req.session.message;
        return res.redirect('/');
    }
};