const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, minlength: 3, maxlength: 15 },
    description: { type: mongoose.SchemaTypes.String, minlength: 20, maxlength: 300 },
    imageURL: { type: mongoose.SchemaTypes.String, required: true },
    difficulty: { type: mongoose.SchemaTypes.Number, minValue: 1, maxValue: 6, required: true }
});

const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;