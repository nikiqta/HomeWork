const Meme = require('./../models/MemeSchema');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

module.exports = {
    getAddMeme: (req, res) => {
        res.render('addMeme', {
            username: req.user[0].username
        });
    },
    createAddMeme: async (req, res) => {

        let meme = req.files.meme;
        let params = req.body;

        let images = await Meme.find({});
        images = images.slice(0);

        let dbLength = images.length;
        let folder = Math.ceil(dbLength / 10);

        if (fs.existsSync(`./public/memeStorage/${folder}/`)) {
            meme.mv(`./public/memeStorage/${folder}/` + meme.name, (err) => {
                if (err) throw err.message;
            });
        } else {
            await fs.mkdirSync(`./public/memeStorage/${folder}/`);
            meme.mv(`./public/memeStorage/${folder}/` + meme.name, (err) => {
                if (err) throw err.message;
            });
        }

        let newMeme = new Meme({
            creator: req.user[0].username,
            title: params.memeTitle,
            memeSrc: `./public/memeStorage/${folder}/` + meme.name,
            description: params.memeDescription,
            privacy: params.status === true,
        });

        newMeme.save()
            .then(() => console.log("Input Data Uploaded Successfully!"))
            .catch((err) => {
                throw err;
            });

        res.redirect(302, '/addMeme');
    },

    viewAllMemes: async (req, res) => {
        const memes = await Meme.find({});
        const username = req.user[0].username;
        const message = req.session.message;
        req.session.currentPage = Number(req.params.page.split('=')[1]);
        const page = Number(req.params.page.split('=')[1]);
        const pageLimit = 6;
        const paginationLength = Math.ceil(memes.length / pageLimit);
        const prevPage = req.session.currentPage - 1 <= 1 ? 1 : req.session.currentPage - 1;
        const nextPage = req.session.currentPage + 1 >= paginationLength ? paginationLength : req.session.currentPage + 1;
        const direction = 'allMemes';
        const paginator = [];
        for (let i = 0; i < paginationLength; i++) {
            paginator.push({
                number: i + 1,
                direction,
            });
        }

        try {
            let sortedMemes = await Meme.find({})
                .sort('-dateStamp')
                .skip((page - 1) * pageLimit)
                .limit(pageLimit)
                .lean();
            res.render('viewAll', {
                memes: sortedMemes,
                username,
                message: req.session.message,
                pages: paginator,
                direction,
                prevPage,
                nextPage
            });
        } catch (err) {
            throw err.message;
        }

    },

    getDetails: async (req, res) => {
        const username = req.user[0].username;
        let {id} = req.params;
        id = id.split('=')[1];

        try {
            let meme = await Meme.find({_id: id.toString()}).lean();

            meme[0].isAuth = meme[0].creator === req.user[0].username;
            res.render('details', {
                meme,
                username
            });
        } catch (err) {
            throw err.message;
        }

    },
    getMyMemes: async (req, res) => {
        const username = req.user[0].username;
        const memes = await Meme.find({creator: username});
        const message = req.session.message;
        req.session.currentPage = Number(req.params.page.split('=')[1]);
        const page = Number(req.params.page.split('=')[1]);
        const pageLimit = 4;
        const paginationLength = Math.ceil(memes.length / pageLimit);
        const prevPage = req.session.currentPage - 1 <= 1 ? 1 : req.session.currentPage - 1;
        const nextPage = req.session.currentPage + 1 >= paginationLength ? paginationLength : req.session.currentPage + 1;
        const direction = 'myMemes';
        const paginator = [];
        for (let i = 0; i < paginationLength; i++) {
            paginator.push({
                number: i + 1,
                direction,
            });
        }

        try {
            let sortedMemes = await Meme.find({creator: username})
                .sort('-dateStamp')
                .skip((page - 1) * pageLimit)
                .limit(pageLimit)
                .lean();
            res.render('myMemes', {
                memes: sortedMemes,
                username,
                message: req.session.message,
                pages: paginator,
                direction,
                prevPage,
                nextPage
            });
        } catch (err) {
            throw err.message;
        }

    },
    getEditPage: async (req, res) => {
        const username = req.user[0].username;
        let {id} = req.params;
        id = id.split('=')[1];
        const meme = await Meme.find({_id: id}).lean();

        res.render('editMeme', {
            username,
            id: meme[0]._id,
            title: meme[0].title,
            description: meme[0].description,
            memeSrc: meme[0].memeSrc
        });

    },
    editDetails: async (req, res) => {
        const username = req.user[0].username;
        let {id} = req.params;
        id = id.split('=')[1];
        console.log(id);
        console.log(req.body);
        await Meme.findByIdAndUpdate(id, {
            $set: {
                title: req.body.memeTitle,
                description: req.body.memeDescription
            }
        }).then(() => console.log("Edit Successful!"));

        return res.redirect('/allMemes/:page=1');
    },
    removeMeme: async (req, res) => {
        let {id} = req.params;
        id = id.split('=')[1];

        try {
            await Meme.findByIdAndRemove({_id: id});
            res.redirect('/myMemes/:page=1');
        } catch (err) {
            throw err.message;
        }
    },
    downLoadMeme: async(req, res) => {
        try {
            let {id} = req.params;
            id = id.split('=')[1];
            const meme = await Meme.find({_id: id}).lean();
            let src = meme[0].memeSrc.slice(1);
            let file = '.' + meme[0].memeSrc;
            let fileLocation = 'C:\\Users\\nikiq\\Desktop\\JSNodeExpress\\ExerciseExpressJS' + src;
            res.download(fileLocation, file);
        } catch (err) {
            throw err.message;
        }
    }
};