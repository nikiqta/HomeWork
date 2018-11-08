const fs = require('fs');
const defaultResponse = require('../utils/defaultResponse.js');

module.exports = (req, res) => {

    if (req.path.startsWith('/public')){

        fs.readFile('.' + req.path, (err, data) => {
           if (err) return console.warn(err.message);

            if (req.path.endsWith('.css') && req.method === 'GET'){
               res.writeHead(200, {
                   'content-type': 'text/css'
               });
            } else if (req.path.endsWith('.png') && req.method === 'GET'){
                res.writeHead(200, {
                    'content-type': 'image/png'
                });
            } else if (req.path.endsWith('.jpg') && req.method === 'GET'){
                res.writeHead(200, {
                    'content-type': 'image/jpg'
                });
            } else if (req.path.endsWith('.js') && req.method === 'GET'){
                res.writeHead(200, {
                    'content-type': 'application/javascript'
                });
            } else if (req.path.endsWith('.html') && req.method === 'GET'){
                res.writeHead(200, {
                    'content-type': 'text/html'
                });
            }

            res.write(data);
            res.end();

        });

    } else if (req.path === '/favicon.ico' && req.method === 'GET') {
        fs.readFile('./public/images/favicon.ico', (err, data) => {
            if (err) return console.warn(err.message);

            res.writeHead(200, {
                'content-type': 'image/x-icon'
            });
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};