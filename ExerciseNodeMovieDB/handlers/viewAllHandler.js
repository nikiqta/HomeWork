const fs = require('fs');
const defaultResponse = require('./../utils/defaultResponse.js');
const db = require('../config/dataBase.js');

module.exports = (req, res) => {
  if (req.path === '/viewAllMovies' && req.method === 'GET') {
    fs.readFile('./views/viewAll.html', (err, data) => {
      if (err) {
        return console.warn(err.message);
      }

      let allMoviesToHTML = '';

      for (const movie of db) {
        allMoviesToHTML += `<div class="movie">
                 <a href="/getDetails?id=${movie.id}">
                 <img alt="poster" class="moviePoster" src="${
                   movie.moviePoster
                 }"/>          
        </div>`;
      }

      data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
     allMoviesToHTML);

      defaultResponse(res, data, 200, 'text/html');
    });
  } else {
    return true;
  }
};
