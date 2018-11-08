const fs = require('fs');

module.exports = (req,res) => {
    if (req.path === '/favicon.ico') {
        fs.readFile('./public/images/favicon.ico', (err, data) => {
            res.writeHead(200, {
                'content-type': 'image/x-icon'
            });

            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};