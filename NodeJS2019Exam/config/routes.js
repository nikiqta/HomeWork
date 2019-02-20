const controllers = require('./../controllers');
const restrictions = require('./auth.js');

module.exports = app => {
    app.get('/', controllers.home.getHome);

    app.get('/user/register', restrictions.isAnonymous, controllers.user.gerRegister);
    app.post('/user/register', restrictions.isAnonymous, controllers.user.postRegister);

    app.get('/user/login', restrictions.isAnonymous, controllers.user.getLogin);
    app.post('/user/login', restrictions.isAnonymous, controllers.user.postLogin);

    app.post('/user/logout', controllers.user.logout);

    app.get('/create/team', restrictions.hasRole('Admin'), controllers.admin.getCreateTeam);
    app.post('/create/team', restrictions.hasRole('Admin'), controllers.admin.postCreateTeam);

    app.get('/create/project', restrictions.hasRole('Admin'), controllers.admin.getCreateProject);
    app.post('/create/project', restrictions.hasRole('Admin'), controllers.admin.postCreateProject);

    app.get('/distribute/team', restrictions.hasRole('Admin'), controllers.admin.getAdminTeamView);
    app.post('/distribute/team', restrictions.hasRole('Admin'), controllers.admin.postAdminTeamDistribute);

    app.get('/distribute/project', restrictions.hasRole('Admin'), controllers.admin.getAdminProjectView);
    app.post('/distribute/project', restrictions.hasRole('Admin'), controllers.admin.postAdminProjectDistribute);

    app.get('/teams', restrictions.hasRole('User'), controllers.user.getUserTeamsView);
    app.get('/projects', restrictions.hasRole('User'), controllers.user.getUserProjectsView);

    app.get('/profile', restrictions.isAuthed, controllers.user.getMyProfile);

    app.post('/leave/:id', restrictions.isAuthed, controllers.user.postLeave);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('<h1>404 Not Found</h1>');
        res.end();
    });
};