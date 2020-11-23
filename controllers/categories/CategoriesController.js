const { Router, request, response } = require('express');
const slugify = require('slugify');

const route = new Router();


const CategoryModel = require('../../models/categories/Category');
const ArticleModel = require('../../models/articles/Articles');

route.get('/home', (request, response) => {

    ArticleModel.findAll({
        include: [
            {
                model: CategoryModel
            }
        ]
    }).then((articles) => {
        response.render('home', { articles: articles });
    });

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

route.post('/categories/delete', (request, response) => {
    const { id } = request.body;

    if (id != undefined) {
        if (!isNaN(id)) {
            CategoryModel.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                response.redirect('/admin/categories')
            })
        } else {
            response.redirect('/admin/categories')
        }
    } else {
        response.redirect('/admin/categories')
    }
});


route.get('/admin/categories/edit/:id', (request, response) => {
    const { id } = request.params;

    if (isNaN(id)) {
        response.redirect('/admin/categories');
    }

    CategoryModel.findByPk(id).then(category => {
        if (category != undefined) {
            response.render('admin/categories/edit', {
                category: category
            })
        } else {
            response.redirect('/admin/categories');
        }
    })
});


route.post('/categories/update', (request, response) => {
    const { idCategory, titleCategory } = request.body;

    CategoryModel.update({
        title: titleCategory,
        slug: slugify(titleCategory)
    }, {
        where: {
            id: idCategory
        }
    }).then(() => {
        response.redirect('/admin/categories')
    })

});


module.exports = route;