const controllers = require('./../controllers');
const isAuthenticated = require('./../utilities/isAuthenticated.js');

module.exports = app => {

    app.get('/', controllers.home.getHome);

    app.get('/register', controllers.user.getRegister);
    app.post('/register', controllers.user.postRegister);

    app.get('/login', controllers.user.getLogin);
    app.post('/login', controllers.user.postLogin);

    app.get('/logout', controllers.user.logout);

    app.post('threads/find');

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });

};