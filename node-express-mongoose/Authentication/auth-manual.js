const router = require('express').Router();
const encryption = require('./encryption.js');

const users = [];

router.get('/login', (req, res) => {
    const message = req.session.message;
    req.session.message = '';
    res.render('login', {message, inputData: req.session.inputData});
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const user = users.filter(u => u.username === username)[0];
    if (user !== undefined){
        const hashedPass = encryption.generateHashedPassword(user.salt, password);
        if (user.hashedPass === hashedPass)  {
            req.session.user = {
                username
            };
            req.session.message = 'Login successful!';
            delete req.session.inputData;
           return res.redirect('/');
        }
    }
        req.session.message = 'Incorrect username or password!';
        req.session.inputData = {
            username,
            password
        };
        res.redirect('/auth/login');
});

router.get('/register', (req, res) => {
    const message = req.session.message;
    req.session.message = '';
    res.render('register', {message, inputData: req.session.inputData});
});

router.post('/register', (req, res) => {
    const {
        username,
        password,
        repPass
    } = req.body;

    if (password !== repPass) {
        error('Passwords do not match');
        return;
    }
    if (users.filter(u => u.username === username).length > 0) {
        error('The username is taken');
        return;
    }

    const salt = encryption.generateSalt();
    const hashedPass = encryption.generateHashedPassword(salt, password);
    const user = {
        username,
        salt,
        hashedPass
    };
    users.push(user);

    req.session.user = {
        username
    };
    req.session.message = 'Registration Successful!';
    return res.redirect('/');

    function error(message) {
        req.session.inputData = {
            username,
            password,
            repPass
        };
        req.session.message = message;
        return res.redirect('/auth/register');
    }
});

module.exports = router;