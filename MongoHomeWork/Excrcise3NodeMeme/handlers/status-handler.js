const fs = require('fs');
const defaultResponse = require('../utils/defaultResponse.js');

module.exports = (req, res) => {
    if (req.path === '/status' && req.method === 'GET'){
        fs.readFile('./views/status.html', (err, data) => {
            if(err) return console.warn(err.message);

            defaultResponse(res, data, 200, 'text/html');
        });
    } else {
        return true;
    }
};