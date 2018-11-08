module.exports = {
    isAuthed: (req, res, next) => {
        if (!req.isAuthenticated()) return res.redirect('/login');
        next();
    },
    hasRole: (role) => {
        return (req, res, next) => {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                next();
            }
            res.redirect('/login');
        }
    }
};