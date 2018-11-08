module.exports = {
    isAuthed: (req, res, next) => {
        if (!req.isAuthenticated()) return res.redirect('/login');
        next();
    },
    hasRole: (role) => {
        return (req, res, next) => {
            const index = req.user[0].roles.indexOf(role);
            if (req.isAuthenticated() && index > -1) {
                next();
            }
            res.redirect('/login');
        }
    }
};