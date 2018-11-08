const productApi = require('./../api/product.js');
const orderApi = require('./../api/order.js');

module.exports = {
    placeGet: async (req, res) => {
        const username = req.user ? req.user[0].username : undefined;
        const id = req.params.id;
        const doner = await productApi.getById(id);
        res.render('order/place', {
            doner: doner[0],
            username
        });
    },
    placePost: async (req, res) => {
        const username = req.user ? req.user[0].username : undefined;
        const data = req.body;
        data.creator = req.user[0]._id;
        try {
            await orderApi.create(data);
            res.redirect('/')
        } catch (err) {
            console.log(err);
            res.render('order/place', {
                error: err.message,
                username
            });
        }
    },
    status: async (req, res) => {
        const username = req.user ? req.user[0].username : undefined;
        const orders = await orderApi.getByUserId(req.user[0]._id);

        res.render('order/status', {
            orders,
            username
        });
    },
    details: async (req, res) => {
        const username = req.user ? req.user[0].username : undefined;
        const order = await orderApi.getById(req.params.id);
        res.render('order/details', {
            order: order[0],
            username
        });
    },
};