const Order = require('mongoose').model('Order');
const productApi = require('../api/product');

async function create(data) {

    const creator = data.creator;
    const product = data.product_id;
    const toppings = [];

    for (let key in data) {
        if (key !== 'creator' && key !== 'product_id') {
            toppings.push(key);
        }
    }
    return await Order.create({
        creator,
        product,
        toppings,
    });
}

async function getByUserId (userId) {
     const orders = await Order.find({creator: userId}).populate('product');
    orders.map(o => {
        o.date = o.dateCreated.toLocaleString();
        o.productName = productApi.getName(o.product.category, o.product.size);
    });
    return orders;
}

async function getById (id) {
    const order = await Order.find({_id: id}).populate('product').lean();
        order[0].date = order[0].dateCreated.toLocaleString();
        order[0].productName = productApi.getName(order[0].product.category, order[0].product.size);
        switch (order[0].status) {
            case 'Pending':
                order[0].pending = true;
                break;
            case 'In progress':
                order[0].progress = true;
                break;
            case 'In transit':
                order[0].transit = true;
                break;
            case 'Delivered':
                order[0].delivered = true;
                break;
            default: break;
        }
    return order;
}

module.exports = {
    create,
    getByUserId,
    getById
};