const mongoose = require('mongoose');

const donerSchema = new mongoose.Schema({
    category: {type: mongoose.SchemaTypes.String, enum: ['chicken', 'beef', 'lamb'], required: [true, 'Category is' +
        ' required!']},
    imageUrl: {type: mongoose.SchemaTypes.String, required: true},
    toppings: {type: [mongoose.SchemaTypes.String], default: []},
    size: {type: mongoose.SchemaTypes.Number, min: 17, max: 24, required: [true, 'Size is required!']}
});

const Doner = mongoose.model('Doner', donerSchema);

module.exports = Doner;