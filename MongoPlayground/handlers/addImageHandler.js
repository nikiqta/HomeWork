const fs = require('fs');
const { parse } = require('querystring');

const mongodb = require('mongodb');
const mongoose = require('mongoose');

const Image = require('./../models/ImageSchema.js');
const Tag = require('./../models/TagSchema.js');

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res);
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res);
  } else {
    return true;
  }
};

function addImage(req, res) {
  let body = [];
  req
    .on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      body = parse(body);
      console.log(body);
      const tags = body.tagsID.split(',').filter(a => a);
      const tagNames = body.tags.split(',').filter(a => a);
      let tagCollection = [];

      for (let tag of tags) {
        tagCollection.push(tag);
      }

      tagCollection = [...new Set(tagCollection)];

      const newImg = new Image({
        url: body.imageUrl,
        title: body.imageTitle,
        description: body.description,
        tags: tagCollection
      });

      for (const tag of newImg.tags) {
        Tag.findByIdAndUpdate(tag, { $push: { images: newImg.url } }).catch(
          err => {
            res.writeHead(500, {
              'content-type': 'text/plain'
            });
            res.write('500 Server Error');
            res.end();
          }
        );
      }

      newImg
        .save()
        .then(() => {
          res.writeHead(302, {
            Location: '/'
          });
          res.end();
        })
        .catch(err => {
          res.writeHead(500, {
            'content-type': 'text/plain'
          });
          res.write('500 Server Error');
          res.end();
        });

      res.writeHead(302, {
        Location: '/'
      });
      res.end();
    });
}

function deleteImg(req, res) {}
