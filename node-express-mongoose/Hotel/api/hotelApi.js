const Hotel = require('mongoose').model('Hotel');
const Comment = require('mongoose').model('Comment');

async function addHotel(data) {
    const {
        creator,
        title,
        location,
        imageUrl,
        type,
        description,
        author
    } = data;

    return await Hotel.create({
        creator,
        title,
        location,
        imageUrl,
        type,
        description,
        author
    });
}

async function getAllHotels() {
    return await Hotel.find({})
        .sort('-dateCreated');
}

async function getDetails(id) {
    const details = await Hotel.find({_id: id});
    const comments = await Comment.find({hotel: id})
        .sort('-dateCreated');
    comments.map(o => {
        o.date = o.dateCreated.toLocaleString();
    });
    return {details, comments}
}

async function postComment(data) {
    const {
        creator,
        hotel,
        title,
        comment,
        author
    } = data;

    return await Comment.create({
        creator,
        hotel,
        title,
        comment,
        author
    })
}

async function getLimitedHotels(page, pageLimit) {

    return await Hotel.find({})
        .sort('-dateStamp')
        .skip((page - 1) * pageLimit)
        .limit(pageLimit)
        .lean();
}

async function getMyHotels(userId, page, pageLimit) {
    return await Hotel.find({creator: userId})
        .sort('-dateStamp')
        .skip((page - 1) * pageLimit)
        .limit(pageLimit)
        .lean();
}

async function getUserHotels (userId) {
    return await Hotel.find({creator: userId});
}

module.exports = {
    addHotel,
    getAllHotels,
    getDetails,
    postComment,
    getMyHotels,
    getLimitedHotels,
    getUserHotels
};