const fs = require('fs');
const service = require('../config/dataBase.js');
const defaultResponse = require('../utils/defaultResponse.js');

module.exports = (req, res) => {
    if (req.path === '/viewAllMemes' && req.method === 'GET') {
        fs.readFile('./views/viewAll.html', (err, data) => {
            if (err) return console.warn(err);

            let db = service.getDb();
            let allMemes = '';

            for (let meme of db) {
                allMemes += `<div class="meme">
                                      <a href="/getDetails?id=${meme.id}">
                                      <img alt="poster" class="memePoster" src="${meme.memeSrc}"/>          
                             </div>`;
            }

            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
                allMemes);

            defaultResponse(res, data, 200, 'text/html');
        });
    } else {
        return true;
    }
};