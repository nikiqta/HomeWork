const encryption = require('./../util/encryption');
const User = require('./../models/UserSchema.js');
const teamApi = require('./../api/teamApi.js');
const projectApi = require('./../api/projectApi.js');
const adminApi = require('./../api/adminApi.js');
const userApi = require('./../api/userApi.js');

module.exports = {
    gerRegister: (req, res) => {
        res.render('user/register');
    },
    postRegister: async (req, res) => {
        const userBody = req.body;
        let error = '';
        let success = '';
        const {
            username,
            firstName,
            lastName,
            password,
            repPass
        } = req.body;

        if (!username || !password || !repPass) {
            error = 'Please fill all fields!';
            res.render('user/register', {
                username,
                firstName,
                lastName,
                password,
                repPass,
                error
            });
            return;
        }

        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, password);

        try {
            const user = await User.create({
                username,
                hashedPass,
                salt,
                firstName,
                lastName,
                roles: ['User']
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.render('user/register', {
                        username,
                        password,
                        repPass,
                        error
                    });
                } else {
                    res.redirect('/');
                }
            });
        } catch (error) {
            res.redirect('user/register');
        }

    },
    getLogin: (req, res) => {
        res.render('user/login');
    },
    postLogin: async (req, res) => {
        const {username, password} = req.body;

        try {
            const user = await User.findOne({username: username});
            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) errorHandler(err);
                else res.redirect('/');
            });
        } catch (error) {
            errorHandler(error);
        }


        function errorHandler(error) {
            res.render('user/login', {
                username,
                password,
                error
            });
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    getUserTeamsView: async (req, res) => {
           try {
               await teamApi.getAllTeams()
                   .then((teams) => {
                       console.log(teams);
                       res.render('user/teamsView',{
                           teams
                       });
                   })
                   .catch(err => console.log(err));
           } catch (e) {
               console.log(e);
           }
    },
    getUserProjectsView: async (req, res) => {
        try {

            await projectApi.getAllProjects()
                .then((projects) => {
                    res.render('user/projectsView', {
                       projects
                    });
                })
                .catch(err => console.log(err));
        } catch (e) {
            console.log(e);
        }
    },
    getMyProfile: async (req, res) => {
        const userData = req.user ? req.user: '';
        try {
          const user =  await userApi.getProfileData(userData._id);

          const teams = user.teams.slice(0);
          const projects = user.projects.slice(0);
          let pr = [];
            for (const team of teams) {
                for (const id of team.projects) {
                    for (const project of projects) {
                        if(project._id.toString() === id.toString()){
                           pr.push(project);
                        }
                    }
                }
            }
          console.log(pr);
            res.render('user/profilePage', {
                user,
                projects: pr.slice(0)
            });

        } catch (e) {
            console.log(e);
        }
    },
    postLeave: async (req, res) => {
        const {  id } = req.params;

        try {
             await userApi.leaveTeam(id, req.user._id)
                 .then(() => {
                     res.redirect('/profile');
                 })
                 .catch(err => console.log(err));
        } catch (e) {
            console.log(e);
        }
    }
};