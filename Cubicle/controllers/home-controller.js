const cubeApi = require('./../api/cubeApi.js');

module.exports = {

    getHome: async (req, res) => {
        const { search, from, to } = req.query;
        const emptyDB = 'There are currently no cubes in the data base yet!';

        if(!search && !from && !to) {
            try {
                const cubes = await cubeApi.getAllCubes();
                res.render('home/home', {
                    cubes,
                    infoMessage: emptyDB
                })
                } catch (err) {
                    console.error(err.message);
                }
        } else {
            try {
                const cubes = await cubeApi.getFilteredCubes(req.query);
                const noResults = 'Thera are no matches for this parameters!';

                    res.render('home/home', {
                        cubes,
                        infoMessage: noResults
                    })
                
                } catch (err) {
                    console.error(err.message);
                }
        }
    },
    getAbout: (req, res) => {
        res.render('about/about');
    }

};