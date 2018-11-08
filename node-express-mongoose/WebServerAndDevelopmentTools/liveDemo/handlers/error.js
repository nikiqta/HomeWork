const fs = require('fs');
const http = require('http');
const url = require('url');


function errorHandler(req, res) {
    fs.readFile('./error.html', 'utf8', function (err, data) {
        res.writeHead(404, {
            'content-type': 'text/html'
        });

        res.write(data);
        res.end();
    });
    return true;
}

module.exports = {errorHandler};