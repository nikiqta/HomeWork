const fs = require('fs');
const url = require('url');
const service = require('../config/dataBase.js');
const defaultResponse = require('../utils/defaultResponse.js');

module.exports = (req, res) => {
    if (req.path === '/getDetails' && req.method === 'GET') {
        const queryData = url.parse(req.url, true).query;

        fs.readFile('./views/details.html', (err, data) => {
            if (err) return console.warn(err.message);

            let db = service.getDb();

            let {id} = queryData;

            let item = db.filter(a => a.id === id);
            let html = '';

            for (let targetedMeme of item) {
                html = `<div class="content">
                            <img src="${targetedMeme.memeSrc}" alt=""/>
                            <h3>${targetedMeme.title}</h3>
                            <p> ${targetedMeme.description}</p>
                            <a href="${targetedMeme.memeSrc}">Full screen</a>
                        </div>`;
            }

            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
                html);

              defaultResponse(res, data, 200, 'text/html');

        });
    } else {
        return true;
    }
};