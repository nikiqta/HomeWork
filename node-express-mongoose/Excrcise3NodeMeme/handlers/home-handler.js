const fs = require('fs');
const defaultResponse = require('../utils/defaultResponse.js');

module.exports = (req, res) => {

    if ((req.path === '/' || req.path === 'home') && req.method === 'GET'){
        fs.readFile('./views/home.html', (err, data) => {
            if (err){
                console.warn(err.message);
                return;
            }


            defaultResponse(res, data, 200, 'text/html');
        })
    } else {
        return true;
    }
};