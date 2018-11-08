let Tag = require('./../models/TagSchema.js');
let Image = require('./../models/ImageSchema.js');
const fs = require('fs');

module.exports = (req, res) => {
    if (req.pathname === '/' && req.method === 'GET') {
        fs.readFile('./views/index.html', (err, data) => {
            if (err) {
                console.log(err);
                return
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            let dispalyTags = '';

            Tag.find({}).then(tags => {
                for (let tag of tags) {
                    dispalyTags += `<div class='tag' id="${tag._id}">${tag.name}</div>`
                }
                data = data
                    .toString()
                    .replace(`<div class='replaceMe'></div>`,
                        dispalyTags);
                res.write(data);
                res.end();
            })
        });
    } else {
        return true
    }
};