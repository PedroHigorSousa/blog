const { Router, request } = require('express');
const route = new Router();
const slugfy = require('slugify');


// Model Categories
const CategoryModel = require('../../models/categories/Category');
const ArticleModel = require('../../models/articles/Articles');


route.get('/admin/articles', (request, response) => {
    response.render('admin/articles/home.ejs')
});

route.get('/admin/articles/new', (request, response) => {


    CategoryModel.findAll().then((categories) => {
        response.render('admin/articles/NewArticle', {
            categories: categories,
        });
    });


});


route.post('/articles/register', (request, response) => {
    const { titleArticle, textAreaArticle, category } = request.body;

    ArticleModel.create({
        title: titleArticle,
        slug: titleArticle,
        body: textAreaArticle,
        categoryId: category
    }).then(() => {
        response.redirect('/admin/articles')
    });
});

module.exports = route;