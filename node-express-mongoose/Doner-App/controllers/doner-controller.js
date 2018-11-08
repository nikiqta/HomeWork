const productApi = require('./../api/product.js');

module.exports = {
    createGet: (req, res) => {
        const username = req.user ? req.user[0].username : undefined;
        res.render('product/create', {username})
    },
    createPost: async (req, res) => {
        try {
            await productApi.create(req.body);
            res.redirect('/');
        } catch (err) {
            console.warn(err);
            return res.render('product/create', {
                error: err.message,
                formData: {
                    category: req.body.category,
                    imageUrl: req.body.imageUrl,
                    toppings: req.body.toppings,
                    size: req.body.size,
                }
            });
        }
    }
};