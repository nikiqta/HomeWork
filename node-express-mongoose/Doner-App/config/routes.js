const controllers = require('./../controllers');
const isAuthenticated = require('./../utilities/isAuthenticated.js');

module.exports = app => {

    app.get('/', controllers.home.index);

    app.get('/register', controllers.user.getRegister);
    app.post('/register', controllers.user.postRegister);

    app.get('/login', controllers.user.getLogin);
    app.post('/login', controllers.user.postLogin);

    app.get('/logout', controllers.user.logout);

    app.get('/product/create', isAuthenticated.isAuthed, controllers.doner.createGet);
    app.post('/product/create', isAuthenticated.isAuthed, controllers.doner.createPost);

    app.get('/order/place/:id', isAuthenticated.isAuthed, controllers.order.placeGet);
    app.post('/order/place', isAuthenticated.isAuthed, controllers.order.placePost);

    app.get('/order', isAuthenticated.isAuthed, controllers.order.status);
    app.get('/order/:id', isAuthenticated.isAuthed, controllers.order.details);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });

};