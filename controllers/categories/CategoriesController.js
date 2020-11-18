const { Router, request } = require('express');
const slugify = require('slugify');

const route = new Router();


const CategoryModel = require('../../models/categories/Category');

route.get('/', (request, response) => {
    response.render('home');
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
            response.redirect('home');
        })
    }
    else {
        response.redirect('/admin/categories/new')
    }
});


module.exports = route;