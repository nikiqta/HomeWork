const Hotel = require('mongoose').model('Hotel');

async function addLike(hotelId, username) {
    return await Hotel.findByIdAndUpdate(hotelId, {$push: {"likes": username}});
}

async function disLike(hotelId, username) {
    return await Hotel.findByIdAndUpdate(hotelId, {$pull: {"likes": username}});
}

async function addViews (hotelId, username) {
    return await Hotel.findByIdAndUpdate(hotelId, {$inc: {"views": 1}});
}

module.exports = {
    addLike,
    disLike,
    addViews
};