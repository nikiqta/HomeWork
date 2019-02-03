const User = require('mongoose').model('User');
const Car = require('mongoose').model('Car');
const Rent = require('mongoose').model('Rent');

async function rentACar(owner, car, data) {
    const { days } = data;
    await Car.findByIdAndUpdate(car, {$set: {isRented: true}});
    return Rent.create({
        days,
        car,
        owner
    });
}

async function getUserRents(id) {
    let myCars = [];
    try {
     const myRents = await Rent.find({owner: id});

        for (const car of myRents) {
            const carId = car.car;
            const days = car.days;
            await Car.findById(carId).lean()
                .then((carDetails) => {
                    carDetails['days'] = days;
                    myCars.push(carDetails);
                })
                .catch();
        }

    } catch (e) {
        console.log(e);
    }

    return myCars;
}

module.exports = {
    rentACar,
    getUserRents
};