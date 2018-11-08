const staticHandler = require("./static.js").staticHandler;
const homeHandler = require("./home.js").homeHandler;
const errorHandler = require("./error.js").errorHandler;
const aboutHandler = require("./about.js").aboutHandler;
const dataHandler = require("./data").dataHandler;
const bigFile = require('./bigFileHandler.js').handleBigFile;

module.exports = [
    staticHandler,
    homeHandler,
    aboutHandler,
    bigFile,
    dataHandler,
    errorHandler
];