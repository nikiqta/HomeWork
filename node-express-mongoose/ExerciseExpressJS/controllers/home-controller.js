const Meme = require('./../models/MemeSchema');

module.exports = {
    getHome: async(req, res) => {
        const memes = await Meme.find({});
        req.session.memesCount = memes.length;
        if (req.user) {
            req.session.message = '';
            res.render('home', {
                username: req.user[0].username,
                memes: memes.length
            });
        } else {
            req.session.message = '';
            res.render('home', {
                memes: memes.length
            });
        }
    }
};