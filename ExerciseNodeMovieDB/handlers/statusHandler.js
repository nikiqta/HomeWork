const fs = require('fs');
const url = require('url');

const db = require('../config/dataBase.js');
const defaultResponse = require('./../utils/defaultResponse.js');

module.exports = (req, res) => {
  if (req.path === '/status' && req.method === 'GET') {
    fs.readFile('./views/status.html', (err, data) => {
      if (err) {
        return console.warn(err.message);
      }

      let currentMoviesLength = db.length;

      data = data.toString().replace('<h1>{{replaceMe}}</h1>', `<h1>${currentMoviesLength} movies so far ...</h1>`);

      defaultResponse(res, data, 200, 'text/html');
    });
  } else {
      return true;
  }
};
