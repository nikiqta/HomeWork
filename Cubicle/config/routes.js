const controllers = require('./../controllers');

module.exports = app => {

    app.get('/', controllers.home.getHome);
    app.get('/about', controllers.home.getAbout);

    app.get('/create', controllers.cube.getCreate);
    app.post('/create', controllers.cube.postCreate);

    app.get('/details/:id', controllers.cube.getDetails);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });

};