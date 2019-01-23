const fs = require('fs');
const formidable = require('formidable');
const shortId = require('shortid');

const service = require('../config/dataBase.js');


const defaultResponse = require('./../utils/defaultResponse.js');

module.exports = (req, res) => {
  if (req.path === '/addMeme' && req.method === 'GET') {
    fs.readFile('./views/addMeme.html', (err, data) => {
      if (err) {
        return console.log(err.message);
      }

      defaultResponse(res, data, 200, 'text/html');
    });
  } else if (req.path === '/addMeme' && req.method === 'POST') {

    let body = {};
    const form = new formidable.IncomingForm();
    const dbLength = service.getDb().length;
    const folder = Math.ceil(dbLength / 10);

    form.on('fileBegin', (name, file) => {

        if (fs.existsSync(`./public/memeStorage/${folder}`)) {
            file.path = `./public/memeStorage/${folder}/` + file.name;
        } else {
            fs.mkdirSync(`./public/memeStorage/${folder}`);
            file.path = `./public/memeStorage/${folder}/` + file.name;
        }
    });

    form.on('error', (err) => {
        return console.log(err.message);
    });

    form.parse(req, async (err, fields, files) => {
        body = {
            id: shortId.generate(),
            title: fields.memeTitle,
            memeSrc: files.meme.path,
            description: fields.memeDescription,
            privacy: fields.status,
            dateStamp: Date.now()
        };

        service.add(body);
        await service.save();

        res.writeHead(301, { Location: 'http://localhost:3000/viewAllMemes' });
        res.end();

    });

  } else {
    return true;
  }
};