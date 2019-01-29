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

async function getCubeById (data) {
    const { id } = data;

    return await Cube.findById(id);
}

async function getFilteredCubes (data) {
    let { search, from, to } = data;

    from = from && Number(from) > 0 ? Number(from) : 1;
    to = to && Number(to) < 7 && Number(to) > 0 ? Number(to) : 6;

    return await Cube.find({name: { $regex: new RegExp("^" + search.toLowerCase(), "i") }})
    .where('difficulty')
    .gte(from)
    .lte(to);

}

module.exports = {
    addCube,
    getAllCubes,
    getCubeById,
    getFilteredCubes
};