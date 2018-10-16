const server = require('http').createServer();
const fs = require('fs');

const port = '4444';
server.on('request', (req, res) => {
    const src = fs.createReadStream('./file.txt');
    src.on('data', data => {
        res.write(data);
    });
    src.on('end', () => res.end());
});

server.listen(port);
console.log(`Server is listening on port ${port}...`);