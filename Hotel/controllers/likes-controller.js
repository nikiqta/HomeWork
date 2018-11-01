const hotelApi = require('./../api/hotelApi.js');
const likesApi = require('./../api/likesAndViewsApi.js');

module.exports = {
    postLike: async (req, res) => {
        const username = req.user[0].username;
        const hotelId = req.params.id;
        try {
         const hotel = await hotelApi.getDetails(hotelId);

            if (!hotel.details[0]._doc.likes.includes(username)) {
                await likesApi.addLike(hotelId, username);
            } else {
                await likesApi.disLike(hotelId, username);
            }
            res.redirect('http://localhost:3000/details/' + hotelId);
        } catch (err) {
            console.warn(err.message);
        }
    },
};