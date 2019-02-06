const mongoose = require('mongoose');

const User = require('./../models/UserSchema.js');
const Thread = require('./../models/ThreadSchema.js');
const Message = require('./../models/MessageSchema.js');

module.exports = config => {
  mongoose.connect(config.dbPath, {
      useMongoClient: true
  });

  const db = mongoose.connection;
  db.once('open', err => {
     if(err) throw err;
     User.seedAdminUser().then(() => {
         console.log('Database ready');
     }).catch((reason) => {
        console.log('Something went wrong!');
        console.log(reason);
     });
  });
  db.on('error', reason => {
      console.log(reason);
  })
};