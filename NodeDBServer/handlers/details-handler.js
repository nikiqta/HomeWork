const fs = require('fs');
const storage = require('./../db/dataStorage.js');

module.exports = (req, res) => {
    if (req.path.startsWith('/details')){
        fs.readFile('./views/details.html', (err, data) => {
            if (err){
                console.warn(err.message);
                return;
            }
            let movieId = req.path.split('/')[2];
            let movies = storage.getMovies();
            let movie = movies[movieId];
            let html = '<div class="content">\n' +
                '    <img src="'+ movie.moviePoster +'" alt=""/>\n' +
                '    <h3>Title  '+ movie.movieTitle +'</h3>\n' +
                '    <h3>Year '+ movie.movieYear +'</h3>\n' +
                '    <p> '+ movie.movieDescription +'</p>\n';



            res.writeHead(200, {
                'content-type': 'text/html'
            });

            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
                html);

            res.write(data);
            res.end();

        });
    } else {
        return true;
    }
};