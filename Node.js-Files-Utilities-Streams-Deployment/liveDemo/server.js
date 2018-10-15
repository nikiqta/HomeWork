const server = require('http').createServer();
const fs = require('fs');

const port = '4444';
server.on('request', (req, res) => {
    fs.readFile('./file.txt', (err, data) => {
        if (err) {
            console.warn(err.message);
            return;
        }

        res.end(data);
    })
});

server.listen(port);
console.log(`Server is listening on port ${port}...`);