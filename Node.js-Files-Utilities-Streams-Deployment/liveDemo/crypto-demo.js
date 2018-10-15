const crypto = require('crypto');

let pass = '1';
let salt = crypto.randomBytes(128);
let hmac = crypto.createHmac('sha1', salt);
let hashedPass = hmac.update(pass).digest('hex');
console.log(hashedPass);
