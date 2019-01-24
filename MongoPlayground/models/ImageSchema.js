const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {type: mongoose.SchemaTypes.String, required: true},
    creationDate: {type: mongoose.SchemaTypes.Date, required: true, default: Date.now()},
    title: {type: mongoose.SchemaTypes.String, required: true},
    description: {type: mongoose.SchemaTypes.String},
    tags: [{type: mongoose.SchemaTypes.ObjectId}]
})

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;