const { Router, request } = require('express');
const routes = new Router();


// Models
const ArticleModel = require('../../models/articles/Articles');


// Route (ONLY RENDER)-> Home page for site
routes.get('/', (request, response) => {

    ArticleModel.findAll().then((articles) => {
        response.render('index', { articles: articles });
    });

});


module.exports = routes;