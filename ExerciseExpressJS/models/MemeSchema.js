const mongoose = require('mongoose');

let memeSchema = new mongoose.Schema({
    creator: {type: mongoose.SchemaTypes.String, required: true},
    title: {type: mongoose.SchemaTypes.String, required: true},
    memeSrc: {type: mongoose.SchemaTypes.String, required: true},
    description: {type: mongoose.SchemaTypes.String, required: true},
    privacy: {type: mongoose.SchemaTypes.Boolean},
    dateStamp: {type: mongoose.SchemaTypes.Date, required: true, default: Date.now}
});

let Meme = mongoose.model('Meme' , memeSchema);

module.exports = Meme;