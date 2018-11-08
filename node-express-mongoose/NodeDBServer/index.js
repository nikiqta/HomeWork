const http = require('http');
const url = require('url');
const port = 4444;

const handlers = require('./handlers');

const app = http.createServer((req, res) => {

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

app.listen(port);
console.log(`Server is listening on port ${port}`);