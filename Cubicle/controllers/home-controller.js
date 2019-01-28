const cubeApi = require('./../api/cubeApi.js');

module.exports = {

    getHome: async (req, res) => {
        try {
        const cubes = await cubeApi.getAllCubes();
        res.render('home/home', {
            cubes
        })
        } catch (err) {
            console.error(err.message);
        }
    },
    getAbout: (req, res) => {
        res.render('about/about');
    }

};