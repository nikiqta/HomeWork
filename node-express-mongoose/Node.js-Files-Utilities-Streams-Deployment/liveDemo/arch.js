const fs = require('fs');
const zlib = require('zlib');

let readStream = fs.createReadStream('./file.txt');
let writeStream = fs.createWriteStream('./file.txt.gz');

//let readStream = fs.createReadStream('./file.txt.gz');
//let writeStream = fs.createWriteStream('./file.txt');

let gzip = zlib.createGzip();
let unzip = zlib.createGunzip();

readStream.pipe(gzip).pipe(writeStream);
//readStream.pipe(unzip).pipe(writeStream);
