const mongoose = require('mongoose');
const Cat = require('./models/Cat.js');

mongoose
    .connect('mongodb://localhost:27017/cats')
    .then(() => {


        /*
                Cat
            .find({})
            .where('age').gt(1).lt(5)
            .sort('name')
            .select('name')
            .skip(1)
            .limit(5)
            .then(cats => console.log(cats));
         */

        /*
                Cat.find({}).then(cats => {
            for (let cat of cats) {
                console.log(`name: ${cat.name}, id: ${cat._id}`);
            }
        });
         */

        /*
                Cat.findByIdAndUpdate('5bc74d9e6c95c72ff07e4ccd', {$set: {name: 'Larry-II'}},
            () => console.log('Updated Successfully!'));
         */

        /*
                let cat = new Cat({
            age: 44
        });
        cat.save().catch(err => console.warn(err.message));
         */

        /*
                Cat.findOne()
            .then(cat => cat.description);
         */

        /*
                Cat.findOne()
            .then(cat => cat.sayHello())
         */

        /*
                Cat.find({})
            .then(cats => console.log(cats));
         */
    })
    .catch(err => console.log(err.message));