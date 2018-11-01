const controllers = require('./../controllers');
const isAuthenticated = require('./../utilities/isAuthenticated.js');

module.exports = app => {

    app.get('/', controllers.home.getHome);
    app.get('/about', isAuthenticated.isAuthed, controllers.home.getAbout);

    app.get('/register', controllers.user.getRegister);
    app.post('/register', controllers.user.postRegister);

    app.get('/login', controllers.user.getLogin);
    app.post('/login', controllers.user.postLogin);

    app.post('/logout', controllers.user.logout);

    app.get('/addHotel', isAuthenticated.isAuthed,  controllers.hotel.getAddHotel);
    app.post('/addHotel', isAuthenticated.isAuthed, controllers.hotel.postAddHotel);

    app.get('/list/:page', isAuthenticated.isAuthed, controllers.hotel.getList);

    app.get('/details/:id',isAuthenticated.isAuthed,  controllers.hotel.getDetails);

    app.post('/comment/:id', isAuthenticated.isAuthed, controllers.hotel.postComment);

    app.get('/myHotels/:page', isAuthenticated.isAuthed, controllers.hotel.getMyHotels);

    app.get('/profile/:id', isAuthenticated.isAuthed, controllers.hotel.getUserDetails);

    app.get('/details/like/:id', isAuthenticated.isAuthed, controllers.likes.postLike);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });

};