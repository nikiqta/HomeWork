const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    creator: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
    hotel: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Hotel' },
    title: { type: mongoose.SchemaTypes.String, required: true },
    comment: { type: mongoose.SchemaTypes.String, required: true },
    dateCreated: { type: mongoose.SchemaTypes.Date, default: Date.now() },
    author: { type: mongoose.SchemaTypes.String, required: true },
});

const Comment = mongoose.model('Comment', commentSchema);

module.export = Comment;