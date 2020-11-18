const { Router, request } = require('express');
const slugify = require('slugify');

const route = new Router();


const CategoryModel = require('../../models/categories/Category');

route.get('/home', (request, response) => {
    response.render('home')
});

route.get('/category/new', (request, response) => {
    response.render('admin/categories/NewCategory');
});


route.post('/category/new/register', (request, response) => {
    const { titleCategory } = request.body;

    if (titleCategory != undefined) {
        CategoryModel.create({
            title: titleCategory,
            slug: slugify(titleCategory)
        }).then(() => {
            response.redirect('/admin/categories');
        })
    }
    else {
        response.redirect('/admin/categories/new')
    }
});


route.get('/admin/categories', (request, response) => {

    CategoryModel.findAll().then((categories) => {
        response.render('admin/categories/index', { categories: categories });
    });
});


module.exports = route;