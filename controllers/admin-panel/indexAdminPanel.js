const { Router, request, response } = require('express');
const routes = new Router();


// Models
const ArticleModel = require('../../models/articles/Articles');
const CategoryModel = require('../../models/categories/Category');


// Route (ONLY RENDER)-> Home page for admin panel
routes.get('/admin-panel', (request, response) => {
    response.render('admin_panel/index_admin_panel');
});


// Route (ONLY RENDER)-> Edite items for categories
routes.get('/admin-panel/categories', (request, response) => {
    CategoryModel.findAll().then((categories) => {
        response.render('index', {
            categories: categories
        })
    });
});


module.exports = routes;