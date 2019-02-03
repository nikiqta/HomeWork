const mongoose = require('mongoose');

const User = require('./../models/UserSchema.js');
const Car = require('./../models/CarSchema.js');
const Rent = require('./../models/RentSchema.js');

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