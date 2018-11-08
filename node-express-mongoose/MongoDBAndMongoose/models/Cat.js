const mongoose = require('mongoose');

let catSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    color: {type: String}
});

catSchema.methods.sayHello = function () {
    return console.log(`Hello from ${this.name}!`);
};

catSchema.virtual('description').get(function () {
    return console.log(`Name ${this.name} - Age ${this.age}`);
});

catSchema.path('age').validate(function () {
    return this.age >= 1 && this.age <= 20;
}, 'Age must be between 1 and 20');

let Cat = mongoose.model('Cat', catSchema);


module.exports = Cat;