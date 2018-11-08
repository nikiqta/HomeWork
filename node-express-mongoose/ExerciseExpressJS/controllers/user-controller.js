const encryption = require('./../utils/encryption.js');
const User = require('mongoose').model('User');

module.exports = {
    getLogin: (req, res) => {
        const message = req.session.message;
        req.session.message = '';
        res.render('login', {
            message,
            inputData: req.session.inputData,
        });
    },

    postLogin: async(req, res) => {
        const {
            username,
            password,
            repPass
        } = req.body;
        try {
            const user = await User.find({ username: username });
            if (user.length === 0) return error('Invalid user data');
//            if (!user.authenticated(password)) return error('Invalid user data');

            let salt = user[0]._doc.salt;
            let userHashedPass = encryption.generateHashedPassword(salt, password);
            if (user[0]._doc.hashedPass !== userHashedPass) return error('Invalid user data');

            req.logIn(user, (err, user) => {
                if (err) {
                   console.warn(err);
                } else {
                    req.session.message = 'Login Successful!';
                    res.redirect('/allMemes/:page=1');
                }
            });
        } catch (err) {
            console.log(err.message);
        }

        function error(message) {
            req.session.inputData = {
                username,
                password,
            };
            req.session.message = message;
            return res.redirect('/login');
        }
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
        const {
            username,
            password,
            repPass
        } = req.body;

        const user = await User.find({username: username});

        if (password !== repPass) return error('Passwords do not match!');
        if (user.length > 0) return error('The username is taken');

        try {

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
        } catch (err) {
            throw err.message;
        }


        function error(message) {
            req.session.inputData = {
                username,
                password,
                repPass,
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