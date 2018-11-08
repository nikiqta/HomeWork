const controllers = require('./../controllers');
const isAuthenticated = require('./../utils/isAuthenticated.js');

module.exports = app => {
    app.get('/', controllers.home.getHome);
    app.get('/addMeme', isAuthenticated.isAuthed, controllers.meme.getAddMeme);
    app.get('/allMemes/:page', isAuthenticated.isAuthed, controllers.meme.viewAllMemes);
    app.get('/details/:id', isAuthenticated.isAuthed, controllers.meme.getDetails);
    app.get('/delete/:id', isAuthenticated.isAuthed, controllers.meme.removeMeme);
    app.get('/edit/:id', isAuthenticated.isAuthed, controllers.meme.getEditPage );
    app.get('/myMemes/:page', isAuthenticated.isAuthed, controllers.meme.getMyMemes);
    app.get('/login', controllers.user.getLogin);
    app.get('/register', controllers.user.getRegister);
    app.get('/download/:id', isAuthenticated.isAuthed, controllers.meme.downLoadMeme);
    app.get('/readSession', (req, res) => {
        res.json(req.session);
    });

    app.post('/login', controllers.user.postLogin);
    app.post('/register', controllers.user.postRegister);
    app.post('/logout', controllers.user.logout);
    app.post('/addMeme', isAuthenticated.isAuthed, controllers.meme.createAddMeme);
    app.post('/edit/:id', isAuthenticated.isAuthed, controllers.meme.editDetails);

    app.all('*', (req, res) => {
       res.status(404);
       res.send('404 Not Found');
       res.end();
    });
};