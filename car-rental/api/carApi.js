const Car = require('mongoose').model('Car');

function addCar(data) {
    const {model, image, pricePerDay} = data;

    return Car.create({
        model, image, pricePerDay
    })
}

function getAllAvailableCars() {
    return Car.find({isRented: false});
}

function getCarById(id) {
    return Car.findById(id);
}

function editCar(id, data) {
    const { model, image, pricePerDay } = data;

    return Car.findByIdAndUpdate(id, {
        model,
        image,
        pricePerDay
    });
}

function searchForCars(text) {
    return Car.find({model: { $regex: new RegExp("^" + text.toLowerCase(), "i") }});
}

module.exports = {
    addCar,
    getAllAvailableCars,
    getCarById,
    editCar,
    searchForCars
};