const homeHandler = require('./home-handler.js');
const staticHandler = require('./static-files-handler.js');
const addMemeHandler = require('./add-meme-handler.js');
const viewAllHandler = require('./view-all-handler.js');
const detailsHandler = require('./details-handler.js');
const statusHandler = require('./status-handler.js');

module.exports = [homeHandler, staticHandler, viewAllHandler, detailsHandler, statusHandler, addMemeHandler];