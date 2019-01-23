const homeHandler = require('./homeHandler.js');
const viewAllMoviesHandler = require('./viewAllMoviesHandler.js');
const staticFilesHandler = require('./staticFilesHandler.js');
const detailsHandler = require('./detailsHandler.js');
const addMovieHandler = require('./addMovieHandler.js');

module.exports = [homeHandler, viewAllMoviesHandler, detailsHandler, addMovieHandler, staticFilesHandler];