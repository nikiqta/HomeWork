const http = require('http');
const url = require('url');
const service = require('./config/dataBase.js');

const port = 3000;
const handlers = require('./handlers');

service.load().then(() => console.log('DataBase Loaded!'));

const server = http.createServer((req, res) => {
    let path = url.parse(req.url).pathname;
    req.path = path;

    for (let i = 0; i < handlers.length; i++) {
        let currentHandler = handlers[i];
        let result = currentHandler(req, res);

        if (!result){
            break;
        }
    }



});
server.listen(port);

console.log(`Server is listening on port ${port}...`);

