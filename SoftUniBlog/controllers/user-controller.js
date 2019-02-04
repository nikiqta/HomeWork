const encryption = require('./../util/encryption');
const User = require('./../models/UserSchema.js');

module.exports = {
    gerRegister: (req, res) => {
        res.render('user/register');
    },
    postRegister: async (req, res) => {
        const userBody = req.body;
        let error = '';
        let success = '';
        const {
            email,
            fullName,
            password,
            repPass
        } = req.body;

        if (!email || !password || !repPass) {
            error = 'Please fill all fields!';
            res.render('user/register', {
                email,
                fullName,
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
                email,
                hashedPass,
                salt,
                fullName,
                roles: ['User']
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.render('user/register', {
                        email,
                        fullName,
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
        const {email, password} = req.body;

        try {
            const user = await User.findOne({email: email});
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
                email,
                password,
                error
            });
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    }
};