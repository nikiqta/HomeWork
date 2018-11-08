const url = require('url');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const {parse} = require('querystring');

const Image = require('./../models/ImageSchema.js');
const Tag = require('./../models/TagSchema.js');

module.exports = (req, res) => {
    if (req.pathname === '/addImage' && req.method === 'POST') {
        addImage(req, res);

    } else if (req.pathname === '/delete' && req.method === 'GET') {
        deleteImg(req, res).then();
    } else {
        return true
    }
};

function addImage(req, res) {

    let body = [];
    req.on('data', chunk => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        body = parse(body);

        let tags = body.tagsID.split(',').filter(a => a);
        let tagNames = body.tags.split(',').filter(a => a);
        let tagCollection = [];

        for (let tag of tags) {
            tagCollection.push(tag);
        }

        tagCollection = [...new Set(tagCollection)];
        let newImg = new Image({
            url: body.imageUrl,
            description: body.description,
            tags: tagCollection
        });

        for (let tag of tags) {
            Tag.findByIdAndUpdate(
                tag,
                {$push: {images: newImg._doc.url}},
            )
                .catch(err => {
                    res.writeHead(500, {
                        'content-type': 'text/plain'
                    });
                    res.write('500 Server Error');
                    res.end();
                });
        }

        newImg.save()
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

async function deleteImg(req, res) {
    const queryData = url.parse(req.url, true).query;
    const imageId = queryData.id;
    await Image.find({_id: imageId})
        .then(image => {

            for (let id of image[0]._doc.tags) {

                Tag.findByIdAndUpdate(
                    id.toString(),
                    {$pull: {images: {$in: [image[0]._doc.url.toString()]}}},
                );
            }
        });

        Image.findByIdAndRemove(imageId)
            .then(() => {
                res.writeHead(302, {
                    Location: '/search'
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


}
