const fs = require('fs');

const service = require('../config/dataBase.js');
const defaultResponse = require('../utils/defaultResponse.js');

module.exports = (req, res) => {

  if (req.path === '/viewAllMemes' && req.method === 'GET') {
    fs.readFile('./views/viewAll.html', (err, data) => {
      if (err) {
        return console.warn(err.message);
      }

      let db = service.getDb();
      let html = '';

      for (const movie of db) {
        html += `<div class="meme">
                 <a href="/getDetails?id=${movie.id}">
                 <img alt="poster" class="memePoster" src="${
                   movie.memeSrc
                 }"/>          
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