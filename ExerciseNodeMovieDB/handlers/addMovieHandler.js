const fs = require('fs');
const { parse } = require('querystring');

const db = require('../config/dataBase.js');
const defaultResponse = require('./../utils/defaultResponse.js');

module.exports = (req, res) => {
  if (req.path === '/addMovie' && req.method === 'GET') {
    fs.readFile('./views/addMovie.html', (err, data) => {
      if (err) {
        return console.log(err.message);
      }

      defaultResponse(res, data, 200, 'text/html');
    });
  } else if (req.path === '/addMovie' && req.method === 'POST') {
    const dbCurrentLastIndex = db.length + 1;
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      body = parse(body);
      body['id'] = dbCurrentLastIndex + 1;

      db.push(body);

      res.writeHead(301, { Location: 'http://localhost:3000/viewAllMovies' });
      res.end();
    });
  } else {
    return true;
  }
};
