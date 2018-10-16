const server = require('http').createServer();
const cluster = require('cluster');
const cpus = require('os').cpus().length;

if (cluster.isMaster) {

    for (let i = 0; i < cpus; i++) {
        console.log('Forking process ' + i);
        cluster.fork()
    }

} else {

    server.on('request', (req,res) => {
        res.end('Hello');
    });
    server.listen(4444);
    console.log(`Server is listening on port 4444...`);
}