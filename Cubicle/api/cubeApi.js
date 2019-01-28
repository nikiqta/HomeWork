const Cube = require('./../models/CubeSchema.js');

async function addCube(data) {
    const {
        name,
        description,
        imageURL,
        difficulty
    } = data;

    return await Cube.create({
        name,
        description,
        imageURL,
        difficulty
    });
}

async function getAllCubes() {
    return await Cube.find({});
}

module.exports = {
    addCube,
    getAllCubes
};