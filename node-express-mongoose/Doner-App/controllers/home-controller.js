const productApi = require('./../api/product.js');

module.exports = {
    index: async (req, res) => {
        const username = req.user ? req.user[0].username : undefined;
        const doners = await productApi.getAll();
        return res.render('home/home', {
            doners,
            username
        });
    }
};