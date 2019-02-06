const encryption = require('./../util/encryption');
const User = require('./../models/UserSchema.js');

module.exports = {
    gerRegister: (req, res) => {
        res.render('user/register');
    },
    postRegister: async (req, res) => {
        const userBody = req.body;
        let error = '';
        const {
            username,
            firstName,
            lastName,
            password,
            repPass,
        } = req.body;

        if (!username || !password || !repPass) {
            error = 'Please fill all fields!';
            res.render('user/register', {
                username,
                firstName,
                lastName,
                password,
                repPass,
                error
            });
            return;
        }

        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, password);

        try {
            const user = await User.create({
                username,
                firstName,
                lastName,
                password,
                salt,
                hashedPass,
                roles: ['User']
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.render('user/register', {
                        username,
                        firstName,
                        lastName,
                        password,
                        repPass,
                        error
                    });
                } else {
                    res.redirect('/');
                }
            });
        } catch (error) {
            res.redirect('user/register');
        }

    },
    getLogin: (req, res) => {
        res.render('user/login');
    },
    postLogin: async (req, res) => {
        const {username, password} = req.body;

        try {
            const user = await User.findOne({username: username});
            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) errorHandler(err);
                else res.redirect('/');
            });
        } catch (error) {
            errorHandler(error);
        }


        function errorHandler(error) {
            res.render('user/login', {
                username,
                password,
                error
            });
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/user/login');
    }
};