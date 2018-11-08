const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const connectionStr = 'mongodb://localhost:27017/playground';

module.exports = mongoose.connect('mongodb://localhost:27017/playground');