const cubeApi = require('./../api/cubeApi.js');
const errors = require('./../utilities/errorHandling.js');

module.exports = {

    getHome: async (req, res) => {
        const { search, from, to } = req.query;
        const emptyDB = 'There are currently no cubes in the data base yet!';

       const fromNumber = from === NaN ? 1 : from;
       const toNumber = to === NaN  ? 6 : to;

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
        } else if ((1 > fromNumber || fromNumber > 6) || (1 > toNumber || toNumber > 6)) {
            const error = errors.error('input validation fieldError');
            res.render('home/home', {
               cubes: [],
               fieldErr: error,
               search,
               from,
               to
            })
        } else if (fromNumber > toNumber) {
            const error = errors.error('input validation wrong order');
            res.render('home/home', {
               cubes: [],
               fieldErr: error,
               search,
               from,
               to
            })
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