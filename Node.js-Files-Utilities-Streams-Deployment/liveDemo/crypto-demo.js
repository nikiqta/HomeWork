const crypto = require('crypto');

let pass = '1234';
let salt = crypto.randomBytes(128);
let hmac = crypto.createHmac('sha512', salt);
let hashedPass = hmac.update(pass).digest('hex');
console.log(hashedPass);

