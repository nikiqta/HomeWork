const mongodb = require('mongodb');
let connectionStr = 'mongodb://localhost:27017/liveDemoDB';
mongodb.MongoClient.connect(connectionStr)
    .then(client => {
        let db = client.db('liveDemoDB');
        let dogs = db.collection('dogs');

        /*
                dogs.insert({
            name: 'Hektor',
            age: 4,
            color: 'Black/Brown',
            breed: 'Foxy-Terrier'
        });
         */

        dogs.find({}).toArray((err, dogs) => console.log(dogs));
    })
    .catch(err => console.warn(err.message)
    );