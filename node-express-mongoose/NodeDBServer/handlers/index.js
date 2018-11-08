const homeHandler = require('./home-handler.js');
const staticHandler = require('./static-file-handler.js');
const faviconHandler = require('./favicon-handler.js');
const detailsHandler = require('./details-handler.js');
const viewAllHandler = require('./view-all-handler.js');
const addMovieHandler = require('./add-movie-handler.js');

module.exports = [homeHandler, faviconHandler, detailsHandler, viewAllHandler, addMovieHandler, staticHandler];