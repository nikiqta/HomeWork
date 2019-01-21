const homeHandler = require('./homeHandler.js');
const viewAllMovies = require('./viewAllHandler.js');
const staticFilesHandler = require('./staticFilesHandler.js');
const detailsHandler = require('./detailsHandler.js');
const addMovieHandler = require('./addMovieHandler.js');
const statusHandler = require('./statusHandler.js');

module.exports = [homeHandler, viewAllMovies, detailsHandler, addMovieHandler, statusHandler, staticFilesHandler];