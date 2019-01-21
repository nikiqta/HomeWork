const http = require('http');
const url = require('url');

const handlers = require('./handlers');
const port = 3000;

http.createServer((req, res) => {

    const path = url.parse(req.url).pathname;
    req.path = path;

    for ( let i = 0; i < handlers.length; i++ ){
        const currentHandler = handlers[i];
        const result = currentHandler(req, res);

        if( !result ){
            break;
        }
    }


}).listen(port);

console.log(`Server is listening on ${port}...`);