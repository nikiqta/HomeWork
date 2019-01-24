const fs = require('fs');
const { parse } = require('querystring');

const Image = require('./../models/ImageSchema.js');
const Tag = require('./../models/TagSchema.js');

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    let body = [];

    req.on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      body = parse(body);

      const newTag = new Tag({
        name: body.tagName,
        Images: []
      });

      newTag
        .save()
        .then(() => {
          res.writeHead(302, {
            Location: '/'
          });
          res.end();
        })
        .catch(err => {
          res.writeHead(500, {
            'content-type': 'text/html'
          });
          res.write('500 Server Error');
          res.end();
        });
    });
  } else {
    return true;
  }
};
