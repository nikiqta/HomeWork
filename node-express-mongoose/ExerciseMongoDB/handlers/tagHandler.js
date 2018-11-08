const {parse} = require('querystring');
const fs = require('fs');
const Tag = require('./../models/TagSchema.js');
const Image = require('./../models/ImageSchema.js');

module.exports = (req, res) => {
    if (req.pathname === '/generateTag' && req.method === 'POST') {
        let body = [];
        req.on('data', chunk => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            body = parse(body);

            let newTag = new Tag({
                name: body.tagName,
                images: []
            });
            newTag.save()
                .then( () => {
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

        });

    } else {
        return true
    }
};
