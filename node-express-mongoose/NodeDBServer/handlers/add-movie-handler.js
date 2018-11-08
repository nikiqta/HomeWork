const fs = require('fs');
const storage = require('./../db/dataStorage.js');
const { parse } = require('querystring');

module.exports = (req, res) => {

    if (req.method === 'POST' && req.path === '/addMovie'){

        let body = [];
        req.on('data', chunk => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            body = parse(body);

            let isValid = true;

            for (let prop in body) {
                if (!body[prop]) {
                    isValid = false;
                    break;
                }
            }

            if (isValid){
                storage.addMovie(body);

                fs.readFile('./views/addMovie.html', (err, data) => {

                    if (err){
                        console.warn(err.message);
                        return;
                    }

                    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
                        '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>');

                    res.writeHead(200, {
                        'content-type': 'text/html'
                    });
                    res.write(data);
                    res.end();

                });
            } else {
                fs.readFile('./views/addMovie.html', (err, data) => {

                    if (err){
                        console.warn(err.message);
                        return;
                    }

                    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
                        '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>');

                    res.writeHead(200, {
                        'content-type': 'text/html'
                    });
                    res.write(data);
                    res.end();

                });
            }
        });

    } else if (req.method === 'GET' && req.path === '/addMovie') {

            fs.readFile('./views/addMovie.html', (err, data) => {

                if (err){
                    console.warn(err.message);
                    return;
                }

                res.writeHead(200, {
                    'content-type': 'text/html'
                });
                res.write(data);
                res.end();

            });

    } else {
        return true;
    }

};