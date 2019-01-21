const fs = require('fs');
const url = require('url');

const db = require('../config/dataBase.js');
const defaultResponse = require('./../utils/defaultResponse.js');

module.exports = (req, res) => {
     
if( req.path === '/getDetails' && req.method === 'GET'){
    const queryData = url.parse(req.url, true).query;
    const movieId = Number(queryData.id);
    
    fs.readFile('./views/details.html', (err, data) => {
          
        if (err) {
            return console.warn(err.message);
          }
    
          let movieToHTML = '';
          const movie = db.filter(m => m.id === movieId)[0];

            movieToHTML += `<div class="content">
            <img src="${movie.moviePoster}" alt=""/>
            <h3>${movie.movieTitle}</h3>
            <h4>${movie.movieYear}</h4>
            <p> ${movie.movieDescription}</p>
        </div>`;

        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
        movieToHTML);

        defaultResponse(res, data, 200, 'text/html');

    });
} else{
    return true;
}

};