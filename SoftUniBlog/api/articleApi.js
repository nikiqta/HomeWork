const Article = require('./../models/ArticleSchema.js');
const User = require('./../models/UserSchema.js');

async function getAllArticles(id) {
    let articles = [];
    try {
     const items = await Article.find().lean();

        for (const article of items) {
            const authorId = article.author.toString();

            await User.findById(authorId).lean()
                .then((userFullName) => {
                     article.author = userFullName.fullName;
                     articles.push(article);
                })
                .catch(err => console.error(err));
        }
    } catch (e) {
        console.error(e);
    }
    return articles;
}

function createArticle (author, title, content) {
    return Article.create({
       title,
       content,
       author
    });
}

function addArticleToUser (id, articleId) {
    return User.findByIdAndUpdate(id, {$push: {articles: articleId}})
}

function getAuthorName(id) {
    return User.findById(id);
}

function getEditDetails (id) {
    return Article.findById(id).lean();
}

function edit(id, data) {
    const { title, content } = data;
    return Article.findByIdAndUpdate(id, {
        title,
        content
    });
}

async function getDetails(id) {
    let article;
    await Article.findById(id).lean()
        .then( async(articleData) => {
            const userId = articleData.author.toString();
            await User.findById(userId).lean()
                .then((user) => {
                    articleData['fullName'] = user.fullName;
                    article = articleData;
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));

    return article;
}

function removeArticle(id) {
    return Article.findByIdAndRemove(id);
}

module.exports = {
  getAllArticles,
    createArticle,
    addArticleToUser,
    getDetails,
    getEditDetails,
    edit,
    removeArticle
};