const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    creator: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
    title: { type: mongoose.SchemaTypes.String, required: true },
    description: { type: mongoose.SchemaTypes.String, required: true },
    location: { type: mongoose.SchemaTypes.String, required: true },
    type: { type: mongoose.SchemaTypes.String, required: true },
    imageUrl: { type: mongoose.SchemaTypes.String, required: true },
    dateCreated: { type: mongoose.SchemaTypes.Date, default: Date.now() },
    author: { type: mongoose.SchemaTypes.String, required: true },
    likes: [ { type: mongoose.SchemaTypes.String, default: [] } ],
    views: { type: mongoose.SchemaTypes.Number, default: 0 }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;