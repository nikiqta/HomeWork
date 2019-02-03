const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    days: {type: mongoose.SchemaTypes.Number, required: true,},
    car: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Car'},
    owner: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User'}
});

const Rent = mongoose.model('Rent', rentSchema);

module.exports = Rent;