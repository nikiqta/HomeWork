const hotelApi = require('./../api/hotelApi.js');

module.exports = {
    getHome: async(req, res) => {
        const currentUser = req.user ? req.user[0] : undefined;

        try {
            const hotels = await hotelApi.getAllHotels();
            res.render('home/home',{
                currentUser,
                hotels
            });
        } catch (err) {
            console.warn(err.message);
        }
    },
    getAbout: (req, res) => {
        const currentUser = req.user ? req.user[0] : undefined;
        res.render('home/about', {
            currentUser
        });
    }
};