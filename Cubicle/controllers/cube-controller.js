const cubeApi = require('./../api/cubeApi.js');
const errors = require('./../utilities/errorHandling.js');

module.exports = {

    getCreate: (req, res) => {
          res.render('cubicles/create')
    },
    postCreate: async (req, res) => {
        const { name, description, imageURL, difficulty } = req.body;
        const isErr = false;    

            if(imageURL.startsWith('https://') && (imageURL.endsWith('.jpg') || imageURL.endsWith('.png'))) {
                try {
                    await cubeApi.addCube(req.body);
                    res.redirect('/');
                } catch(err) {
                    const error = errors.error(err.message);
                    return res.render('cubicles/create', {
                        name,
                        description,
                        imageURL,
                        difficulty,
                        fieldErr: error
                    });
                }
            } else {
                const error = errors.error('Cube validation failed: imageURL');
                return res.render('cubicles/create', {
                    name,
                    description,
                    imageURL,
                    difficulty,
                    fieldErr: error
                });
            }


    },
    getDetails: async (req, res) => {
           
           try{
           const cube = await cubeApi.getCubeById(req.params);
           res.render('cubicles/details', {
            cube
           });
           } catch(err) {
             console.error(err.message);
           }
    }
};