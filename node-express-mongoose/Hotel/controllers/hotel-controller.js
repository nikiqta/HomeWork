const hotelApi = require('./../api/hotelApi.js');
const viewsApi = require('./../api/likesAndViewsApi.js');

module.exports = {

    getAddHotel: (req, res) => {
        const currentUser = req.user ? req.user[0] : undefined;
        res.render('hotels/generateHotel', {
            currentUser
        });
    },
    postAddHotel: async (req, res) => {
        req.body.creator = req.user[0]._id;
        req.body.author = req.user[0].username;
        try {
            await hotelApi.addHotel(req.body);
            res.redirect('/')
        } catch (err) {
            console.warn(err.message);
            return res.render('/addHotel',
                {
                    formData: {
                        title: req.body.title,
                        location: req.body.location,
                        imageUrl: req.body.imageUrl,
                        type: req.body.type,
                        description: req.body.description,
                        author: req.body.author
                    }
                });
        }
    },
    getList: async (req, res) => {
        const currentUser = req.user ? req.user[0] : undefined;
        req.session.currentPage = Number(req.params.page.split('=')[1]);
        const page = Number(req.params.page.split('=')[1]);
        const pageLimit = 3;

        try {
            const hotels = await hotelApi.getAllHotels();

            const paginationLength = Math.ceil(hotels.length / pageLimit);
            const prevPage = req.session.currentPage - 1 <= 1 ? 1 : req.session.currentPage - 1;
            const nextPage = req.session.currentPage + 1 >= paginationLength ? paginationLength : req.session.currentPage + 1;
            const direction = 'list';
            const paginator = [];
            for (let i = 0; i < paginationLength; i++) {
                paginator.push({
                    number: i + 1,
                    direction,
                });
            }
            const prevPageZero = prevPage !== 1 || req.session.currentPage !== 1;
            const nextPageZero = nextPage !== paginationLength || req.session.currentPage !== paginationLength;
            const limitedHotels = await hotelApi.getLimitedHotels(page, pageLimit);
            res.render('hotels/hotelList', {
                hotels: limitedHotels,
                currentUser,
                message: req.session.message,
                pages: paginator,
                direction,
                prevPage,
                nextPage,
                prevPageZero,
                nextPageZero
            });
        } catch (err) {
            console.warn(err.message);
        }

    },
    getMyHotels: async (req, res) => {
        const currentUser = req.user ? req.user[0] : undefined;
        req.session.currentPage = Number(req.params.page.split('=')[1]);
        const page = Number(req.params.page.split('=')[1]);
        const pageLimit = 2;

        try {
            const hotels = await hotelApi.getUserHotels(currentUser._id);

            const paginationLength = Math.ceil(hotels.length / pageLimit);
            const prevPage = req.session.currentPage - 1 <= 1 ? 1 : req.session.currentPage - 1;
            const nextPage = req.session.currentPage + 1 >= paginationLength ? paginationLength : req.session.currentPage + 1;
            const direction = 'myHotels';
            const paginator = [];
            for (let i = 0; i < paginationLength; i++) {
                paginator.push({
                    number: i + 1,
                    direction,
                });
            }
            const prevPageZero = prevPage !== 1 || req.session.currentPage !== 1;
            const nextPageZero = nextPage !== paginationLength || req.session.currentPage !== paginationLength;
            const limitedHotels = await hotelApi.getMyHotels(currentUser._id, page, pageLimit);
            res.render('hotels/myHotels', {
                hotels: limitedHotels,
                currentUser,
                message: req.session.message,
                pages: paginator,
                direction,
                prevPage,
                nextPage,
                prevPageZero,
                nextPageZero
            });
        } catch (err) {
            console.warn(err.message);
        }
    },
    getDetails: async (req, res) => {
        const id = req.params.id;
        const currentUser = req.user ? req.user[0] : undefined;
        try {
            await viewsApi.addViews(id, currentUser.username);
            const hotel = await hotelApi.getDetails(id);
            hotel.details[0].likesCount = hotel.details[0].likes.length !== 0 ? hotel.details[0].likes.length : 0;
            hotel.details[0].viewsCount = hotel.details[0].views;
            const isLiked = hotel.details[0].likes.includes(currentUser.username);
            res.render('hotels/details', {
                currentUser,
                hotel: hotel.details[0],
                comments: hotel.comments,
                isLiked
            })
        } catch (err) {
            console.warn(err.message);
        }
    },
    getUserDetails: async (req, res) => {
        const currentUser = req.user ? req.user[0] : undefined;
        try {
            const hotels = await hotelApi.getUserHotels(currentUser._id);
            res.render('hotels/userHotels',{
                currentUser,
                hotels
            })
        } catch (err) {

        }
    },
    postComment: async (req, res) => {
        const hotelId = req.params.id;
        req.body.creator = req.user[0]._id;
        req.body.hotel = hotelId;
        req.body.author = req.user[0].username;
        try {
            await hotelApi.postComment(req.body);
            res.redirect('http://localhost:3000/details/' + hotelId);
        } catch (err) {
            console.warn(err.message);
        }
    }

};