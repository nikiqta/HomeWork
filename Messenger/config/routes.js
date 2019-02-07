const controllers = require('./../controllers');
const restrictions = require('./auth.js');

module.exports = app => {
    app.get('/', controllers.home.getHome);

    app.get('/user/register', restrictions.isAnonymous, controllers.user.gerRegister);
    app.post('/user/register', restrictions.isAnonymous, controllers.user.postRegister);

    app.get('/user/login', restrictions.isAnonymous, controllers.user.getLogin);
    app.post('/user/login', restrictions.isAnonymous, controllers.user.postLogin);

    app.post('/user/logout', restrictions.isAuthed, controllers.user.logout);

    app.post('/threads/find', restrictions.isAuthed, controllers.thread.findThread);

    app.get('/thread/:otherUser', restrictions.isAuthed, controllers.thread.getThread);
    app.post('/thread/:otherUser', restrictions.isAuthed, controllers.thread.sendMessage);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('<h1>404 Not Found</h1>');
        res.end();
    });
};