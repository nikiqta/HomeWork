const fs = require('fs');
const http = require('http');
const url = require('url');

function aboutHandler(req, res) {
    if (req.path === '/about.html'){
        res.sendHtml('./about.html');
    } else {
        return true;
    }
}

module.exports = {aboutHandler};