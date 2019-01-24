const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
       name: {type: mongoose.SchemaTypes.String, required: true},
       creationDate: {type: mongoose.SchemaTypes.Date, required: true, default: Date.now()},
       images: [{type: mongoose.SchemaTypes.Array}]
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;