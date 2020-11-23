const { Router, request } = require('express');
const slugfy = require('slugify');
const routes = new Router();


// Models
const CategoryModel = require('../../models/categories/Category');
const ArticleModel = require('../../models/articles/Articles');


// Route (ONLY RENDER)-> List all articles
routes.get('/admin/articles', (request, response) => {
    // JOIN -> ArticlesModel + CategoryModel
    ArticleModel.findAll(
        {
            include: [
                {
                    model: CategoryModel
                }
            ]
        }
    ).then(articles => {
        response.render('/admin/articles/home', { articles: articles })
    })
});


// Route (ONLY RENDER)-> Route that renders the form for creating a new article
routes.get('/admin/form/new/article', (request, response) => {
    response.render('/admin/articles/NewArticle')
});


// Route (CREATE)-> Register article
routes.post('/admin/new/article/register', (request, response) => {
    const { titleArticle, bodyArticle, categoryArticle } = request.body;


    ArticleModel.create({
        title: titleArticle,
        slug: slugfy(titleArticle),
        body: bodyArticle,
        categoryId: categoryArticle
    }).then(() => {
        response.redirect('/admin/articles')
    })
});


// Route (DELETE)-> Delete article
routes.post('/admin/delete/article', (request, response) => {
    const { idArticle } = request.body;

    if (idArticle != undefined && !isNaN(idArticle)) {
        ArticleModel.destroy({
            where: {
                id: idArticle
            }
        }).then(() => {
            response.redirect('/admin/articles');
        })
    } else {
        response.redirect('/admin/articles');
    }
});


module.exports = route;