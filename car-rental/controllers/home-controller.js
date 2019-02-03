module.exports = {
    getHome: (req, res) => {
        const user = req.user ? req.user: '';
        const isAdmin = user && req.user.roles.includes('Admin');

        res.render('home/index', {
            user,
            isAdmin
        });
    }
};