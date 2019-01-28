const cubeApi = require('./../api/cubeApi.js');
const errorHandler = require('./../utilities/errorHandling.js');


module.exports = {

    getCreate: (req, res) => {
          res.render('cubicles/create')
    },
    postCreate: async (req, res) => {
        const { name, description, imageURL, difficulty } = req.body;

        if(imageURL.startsWith('https://') &&
            (imageURL.endsWith('.jpg')||
                imageURL.endsWith('.png'))) {
            try {
                await cubeApi.addCube(req.body);
                res.redirect('/');
            } catch(err) {
                console.error(errorHandler.correctError(err.message));
                return res.render('cubicles/create', {
                    name,
                    description,
                    imageURL,
                    difficulty
                });
            }
        } else {
            console.error(errorHandler.correctError('Cube validation failed: imageURL'))
        }


    },
    getDetails: (req, res) => {
           res.render('cubicles/details')
    }
};