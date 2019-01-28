const url = require('url');
const fs = require('fs');
const defaultResponse = require('../utils/defaultResponse.js');
const Image = require('./../models/ImageSchema.js');
const Tag = require('./../models/TagSchema.js');

module.exports = (req, res) => {
    if (req.pathname === '/search') {
        fs.readFile('./views/results.html', async (err, data) => {

            if (err) throw err.message;

            let availableTags = [];
            let goodTags = [];
            await Tag.find({})
                .then(tags => {
                    availableTags = tags.slice(0);
                }).catch(err => {
                    throw err.message;
                });

            availableTags.map(t => goodTags.push(t.name));

            const queryData = url.parse(req.url, true).query;
            let {tagName, afterDate, beforeDate, Limit} = queryData;
            const limit = Limit;

            tagName = tagName.split(',').filter(a => a);




            let imageData = [];
            if (afterDate) afterDate = new Date(afterDate);
            if (beforeDate) beforeDate = new Date(beforeDate);

            if (tagName.length !== 0 && tagName && tagName[0] !== "Write tags separated by ") {
                let filteredImagesUrl = [];

                for (let tag of tagName) {

                    if(goodTags.includes(tag.trim())){
                        await Tag.find({name: tag.trim()})
                            .then(tag => {
                                filteredImagesUrl = filteredImagesUrl.concat(tag[0]._doc.images);
                            }).catch(err => {
                                throw err.message;
                            });
                    }
                }

                filteredImagesUrl = [...new Set(filteredImagesUrl)];
                let tagImages = [];

                for (let item of filteredImagesUrl) {
                    await Image.find({url: item})
                        .then(image => {
                            tagImages.push([...image]);
                        }).catch(err => {
                            throw err.message;
                        });
                }
                if (afterDate) tagImages = tagImages.filter(img => img[0]._doc.creationDate > afterDate);
                if (beforeDate) tagImages = tagImages.filter(img => img[0]._doc.creationDate < beforeDate);

                if (limit) {
                    if (tagImages.length >= Number(limit)) tagImages = tagImages.slice(0, Number(limit));
                }
                defaultResponse(res, data, 200, 'text/html', [...tagImages]);
            } else {
                if (afterDate) afterDate = new Date(afterDate);
                if (beforeDate) beforeDate = new Date(beforeDate);

                await Image.find({})
                    .sort('-creationDate')
                    .then(images => {
                        imageData = images.slice(0);
                    })
                    .catch(err => {
                        throw err.message;
                    });

                if (afterDate) imageData = imageData.filter(img => img.creationDate > afterDate);
                if (beforeDate) imageData = imageData.filter(img => img.creationDate < beforeDate);

                if (limit) {
                    if (imageData.length >= Number(limit)) imageData = imageData.slice(0, Number(limit));
                }

                defaultResponse(res, data, 200, 'text/html', imageData);
            }
        });

    } else {
        return true
    }
};