const http =  require('http');
const port = 4444;
const server = http.createServer((req, res) => {
   console.log(req.headers);
   res.write('Hi!');
    res.end();
});
server.listen(port);
console.log(`Server listening on port: ${port} ...`);