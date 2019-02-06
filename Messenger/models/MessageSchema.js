const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: { type: mongoose.SchemaTypes.String, required: true },
    user: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
    thread: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Thread' }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;