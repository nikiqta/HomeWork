const fs = require('fs');
const url = require('url');

const service = require('../config/dataBase.js');
const defaultResponse = require('../utils/defaultResponse.js');

module.exports = (req, res) => {
     
if( req.path === '/getDetails' && req.method === 'GET'){
    const { id } = url.parse(req.url, true).query;
    
    
    fs.readFile('./views/details.html', (err, data) => {
          
        if (err) {
            return console.warn(err.message);
          }
    
          const db = service.getDb();
          const targetedMeme = db.filter(m => m.id == id)[0];

          html = `<div class="content">
                    <img src="${targetedMeme.memeSrc}" alt=""/>
                    <h3>${targetedMeme.title}</h3>
                    <p> ${targetedMeme.description}</p>
                    <a href="${targetedMeme.memeSrc}">Download Meme</a>
                  </div>`;

        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
        html);

        defaultResponse(res, data, 200, 'text/html');

    });
} else{
    return true;
}

};