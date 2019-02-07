const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
    users: [{ type: mongoose.SchemaTypes.String, required: true }],
    dateCreated: { type: mongoose.SchemaTypes.Date, default: Date.now }
});

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;