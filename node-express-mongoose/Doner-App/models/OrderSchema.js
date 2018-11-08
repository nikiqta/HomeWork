const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    creator: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
    product: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Doner' },
    dateCreated: { type: mongoose.SchemaTypes.Date, default: Date.now },
    toppings: { type: [mongoose.SchemaTypes.String], },
    status: { type: mongoose.SchemaTypes.String, enum: ['Pending', 'In Progress', 'In Transit', 'Delivered'], default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;