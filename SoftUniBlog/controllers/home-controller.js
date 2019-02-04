const articleApi = require('./../api/articleApi.js');

module.exports = {
    getHome: async (req, res) => {
        const user = req.user ? req.user: '';
        const isAdmin = user && req.user.roles.includes('Admin');
        try {
            await articleApi.getAllArticles()
                .then((articles) => {
                            res.render('home/index', {
                                articles,
                                user
                            });

                })
                .catch(err => console.error(err));
        } catch (e) {
            console.error(e);
        }
    }
};