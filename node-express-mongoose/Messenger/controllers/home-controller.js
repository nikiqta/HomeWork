module.exports = {
    getHome: (req, res) => {
        const currentUser = req.user ? req.user[0] : undefined;
        res.render('home/home',{
            currentUser
        })
    }
};