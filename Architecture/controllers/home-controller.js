const articleApi = require('./../api/articleApi.js');

module.exports = {
    getHome: async (req, res) => {
        const user = req.user ? req.user: '';
 //       const isAdmin = user && req.user.roles.includes('Admin');
                            res.render('home/index', {
                                articles,
                                user
                            });

    }
};