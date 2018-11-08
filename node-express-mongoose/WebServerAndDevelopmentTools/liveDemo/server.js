const http = require('http');
const url = require('url');
const fs = require('fs');
const handlers = require('./handlers/index.js');

const server = http.createServer(frontController);
const port = 5000;

function frontController(req, res){
    req.path = url.parse(req.url).pathname;
    res.sendHtml = function(path){
        fs.readFile(path, 'utf8', function (err, data) {
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    };
    console.log(req.path);

    if(req.method === 'GET'){
        for (let handler of handlers) {
            if (handler(req,res) !== true){
                break;
            }
        }
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            console.log(body);
            res.end();
        });
    }
}

server.listen(port);
console.log(`Listening on port ${port}...`);