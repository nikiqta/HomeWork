module.exports = {
    getHome: async (req, res) => {
        const user = req.user ? req.user : '';

        res.render('home/index', {
            user
        });

    }
};