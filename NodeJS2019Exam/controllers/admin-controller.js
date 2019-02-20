const teamApi = require('./../api/teamApi.js');
const projectApi = require('./../api/projectApi.js');
const adminApi = require('./../api/adminApi.js');

module.exports = {
    getCreateTeam: (req, res) => {
         res.render('admin/createTeamForm');
    },
    postCreateTeam: async (req, res) => {
        const { name } = req.body;
        if (!name) {
            res.render('admin/createTeamForm', {
                name,
                error: 'Please fill all fields!'
            });
        } else {
            try {
                await teamApi.createTeam(name)
                    .then(() => {
                          res.redirect('/');
                    })
                    .catch(err => console.log(err));
            } catch (e) {
                console.log(e);
            }
        }
    },
    getCreateProject: (req, res) => {
        res.render('admin/createProjectForm');
    },
    postCreateProject: async (req, res) => {
        const { name, description } = req.body;
        if (!name || !description) {
            res.render('admin/createProjectForm', {
                name,
                description,
                error: 'Please fill all fields!'
            });
        } else {
            try {
                await projectApi.createProject(name, description)
                    .then(() => {
                        res.redirect('/');
                    })
                    .catch(err => console.log(err));
            } catch (e) {
                console.log(e);
            }
        }
    },
    getAdminTeamView: async (req, res) => {
        try {
            const users = await adminApi.getAllUsers();
            const teams = await adminApi.getAllTeams();

            res.render('admin/teamsView', {
                users,
                teams
            });

        } catch (e) {
            console.log(e);
        }
    },
    postAdminTeamDistribute: async (req, res) => {
        const { userId, teamId } = req.body;

        try {
            await adminApi.distributeUserIntoTeam(userId, teamId)
                .then(() => {
                    res.redirect('/');
                })
                .catch(err => console.log(err));
        } catch (e) {
            console.log(e);
        }
    },
    getAdminProjectView: async (req, res) => {
        try {
            const teams = await adminApi.getAllTeams();
            const projects = await adminApi.getEmptyProjects();

            res.render('admin/projectsView',
                {
                    teams,
                    projects
                });
        } catch (e) {
            console.log(e);
        }
    },
    postAdminProjectDistribute: async (req, res) => {
       const { teamId, projectId } = req.body;

       try {
            await adminApi.distributeTeamIntoProject(teamId, projectId)
                .then(() => {
                    res.redirect('/');
                })
                .catch(err => console.log(err));
       } catch (e) {
           console.log(e);
       }
    }
};