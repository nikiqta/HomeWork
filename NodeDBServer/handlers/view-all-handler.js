const fs = require('fs');
const storage = require('./../db/dataStorage.js');

module.exports = (req, res) => {
    if (req.path === '/viewAllMovies') {
        fs.readFile('./views/viewAll.html', (err, data) => {
            if (err) {
                console.warn(err.message);
                return;
            }

            res.writeHead(200, {
                'content-type': 'text/html'
            });

            let movies = storage.getMovies();
            let html = '';

            for (let element of movies) {
                let currentMovie = '<div class="movie">\n' +
                    '<a href="/details/'+ element["id"] +'"><img class="moviePoster" src="'+ element["moviePoster"] +'"/></a>\n' +
                    '</div>\n';
                html += currentMovie;
            }

            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
                html);

            res.write(data);
            res.end();

        });
    } else {
        return true;
    }
};