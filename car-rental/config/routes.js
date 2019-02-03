const controllers = require('./../controllers');
const restrictions = require('./auth.js');

module.exports = app => {
    app.get('/', controllers.home.getHome);

    app.get('/user/register', restrictions.isAnonymous, controllers.user.gerRegister);
    app.post('/user/register', restrictions.isAnonymous, controllers.user.postRegister);

    app.get('/user/login', restrictions.isAnonymous, controllers.user.getLogin);
    app.post('/user/login', restrictions.isAnonymous, controllers.user.postLogin);

    app.post('/user/logout', controllers.user.logout);

    app.get('/car/add', restrictions.hasRole('Admin'), controllers.car.getAddCar);
    app.post('/car/add', restrictions.hasRole('Admin'), controllers.car.postAddCar);

    app.get('/car/all', controllers.car.viewAllCars);

    app.get('/car/rent/:id', restrictions.isAuthed, controllers.car.getCarDetails);
    app.post('/car/rent/:id', restrictions.isAuthed, controllers.car.rentCar);

    app.get('/user/rents', restrictions.isAuthed, controllers.car.myRents);

    app.get('/car/edit/:id', restrictions.hasRole('Admin'), controllers.car.getEditCar);
    app.post('/car/edit/:id', restrictions.hasRole('Admin'), controllers.car.editCar);

    app.post('/search', restrictions.isAuthed, controllers.car.searchFilter);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('<h1>404 Not Found</h1>');
        res.end();
    });
};