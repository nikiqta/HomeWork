const controllers = require('./../controllers');
const restrictions = require('./auth.js');

module.exports = app => {
    app.get('/', controllers.home.getHome);

    app.get('/user/register', restrictions.isAnonymous, controllers.user.gerRegister);
    app.post('/user/register', restrictions.isAnonymous, controllers.user.postRegister);

    app.get('/user/login', restrictions.isAnonymous, controllers.user.getLogin);
    app.post('/user/login', restrictions.isAnonymous, controllers.user.postLogin);

    app.post('/user/logout', controllers.user.logout);

    app.get('/article/create', restrictions.isAuthed, controllers.article.getCreateArticle);
    app.post('/article/create', restrictions.isAuthed, controllers.article.postCreateArticle);

    app.get('/article/details/:id', restrictions.isAuthed, controllers.article.getDetails);

    app.get('/article/edit/:id', restrictions.isAuthed, controllers.article.getEditArticle);
    app.post('/article/edit/:id', restrictions.isAuthed, controllers.article.postEditArticle);

    app.get('/article/delete/:id', restrictions.isAuthed, controllers.article.getDeleteArticle);
    app.post('/article/delete/:id', restrictions.isAuthed, controllers.article.postDeleteArticle);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('<h1>404 Not Found</h1>');
        res.end();
    });
};
