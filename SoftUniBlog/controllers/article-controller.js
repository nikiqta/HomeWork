const Article = require('./../models/ArticleSchema.js');
const articleApi = require('./../api/articleApi.js');

module.exports = {
    getCreateArticle: async (req, res) => {
        res.render('article/create');
    },
    postCreateArticle: async (req, res) => {
        const {title, content} = req.body;
        const author = req.user._id;

        try {
            await articleApi.createArticle(author, title, content)
                .then(async (article) => {
                    const articleId = article._doc._id;
                    await articleApi.addArticleToUser(author, articleId.toString())
                        .then(() => {
                            res.redirect('/');
                        })
                        .catch(err => console.error(err));
                })
                .catch(err => console.error(err));
        } catch (e) {
            console.error(e);
        }
    },
    getDetails: async (req, res) => {
        const { id } = req.params;

        try {
            await articleApi.getDetails(id)
                .then((article) => {

                    const isAuth = (req.user.isAuthor(article) || req.user.isInRole('Admin'));
                    const date = `${new Date(article.date).toDateString()} - ${new Date(article.date).toLocaleTimeString()} `;
                    res.render('article/details', {
                        article,
                        date,
                        isAuth
                    })
                })
                .catch(err => console.error(err));
        } catch (e) {
            console.error(e);
        }
    },
    getEditArticle: async (req, res) => {
        const { id } = req.params;
             await articleApi.getEditDetails(id)
                 .then((article) => {
                     res.render('article/edit', {
                         article
                     })
                 })
                 .catch(err => console.error(err));
        try {

        } catch (e) {
            console.log(e)
        }
    },
    postEditArticle: async (req, res) => {
        const { id } = req.params;

        try {
            await articleApi.edit(id, req.body)
                .then(() => {
                    res.redirect('/');
                })
                .catch(err => console.error(err));
        } catch (e) {
            console.error(e);
        }
    },
    getDeleteArticle: async (req, res) => {
        const { id } = req.params;
        await articleApi.getEditDetails(id)
            .then((article) => {
                res.render('article/delete', {
                    article
                })
            })
            .catch(err => console.error(err));
        try {

        } catch (e) {
            console.log(e)
        }
    },
    postDeleteArticle: async (req, res) => {
        const { id } = req.params;

        try {
            await articleApi.removeArticle(id)
                .then(() => {
                    res.redirect('/');
                })
                .catch(err => console.error(error));
        } catch (e) {
            console.error(e);
        }
    }
};