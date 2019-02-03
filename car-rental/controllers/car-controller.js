const carApi = require('./../api/carApi.js');
const rentApi = require('./../api/rentApi.js');

module.exports = {
    getAddCar: (req, res) => {
        res.render('car/add');
    },
    postAddCar: async (req, res) => {
        const {model, image, pricePerDay} = req.body;
        let error = '';

        if (!model || !image || !pricePerDay) {
            error = 'Please field all fields!';
            res.render('car/add', {
                model,
                image,
                pricePerDay,
                error
            })
        }

        try {
            await carApi.addCar(req.body)
                .then(() => {
                    res.redirect('/car/all');
                })
                .catch(error => console.error(error));
        } catch (error) {
            console.error(error);
        }

    },
    viewAllCars: async (req, res) => {
        try {
            await carApi.getAllAvailableCars()
                .then(cars => {
                    res.render('car/all', {
                        cars
                    });
                })
                .catch(error => console.error((error)));
        } catch (e) {
               console.error(e);
        }
    },
    getCarDetails: async (req, res) => {
        const { id } = req.params;

        try {
            const car = await carApi.getCarById(id)
                .then(car => {
                    res.render('car/rent', {
                        car
                    });
                })
                .catch(err => console.log(err));
        } catch (e) {
            console.error(e);
        }
    },
    rentCar: async (req, res) => {
        const carId = req.params.id;
        const userId = req.user._id;

        try{
            await rentApi.rentACar(userId, carId, req.body)
                .then(() => {
                    res.redirect('/car/all');
                })
        } catch (e) {
            console.error(e);
        }
    },
    myRents: async (req, res) => {
        const { id } = req.user;

        try {
            const cars = await rentApi.getUserRents(id)
                .then((cars) => {
                    res.render('user/rented', {
                        cars
                    });
                })
                .catch(err => console.error(err));
        } catch (e) {
            console.error(e);
        }
    },
    getEditCar: async (req, res) => {
        const { id } = req.params;

        try {
            const car = await carApi.getCarById(id)
                .then(car => {
                    res.render('car/edit', {
                        car
                    });
                })
                .catch(err => console.log(err));
        } catch (e) {
            console.error(e);
        }
    },
    editCar: async (req, res) => {
         const { id } = req.params;

        try{
            await carApi.editCar(id, req.body)
                .then(() => {
                    res.redirect('/car/all');
                })
        } catch (e) {
            console.error(e);
        }
    },
    searchFilter: async (req, res) => {
         const { model } = req.body;

         try {
         const carResults = await carApi.searchForCars(model)
             .then((cars) => {
                 res.render('car/all', {
                     cars
                 });
             })
             .catch(e => console.error(e));
         } catch (e) {
             console.log(e);
         }
    }
};