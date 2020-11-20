const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// Settings view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));


// Settings body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Database
const connection = require('./database/connection');


// Models
const CategoryModel = require('./models/categories/Category');
const ArticleModel = require('./models/articles/Articles');


// Controllers
const CategoryController = require('./controllers/categories/CategoriesController');
const ArticleController = require('./controllers/articles/ArticleController');


// Routes
app.use('/', CategoryController);
app.use('/', ArticleController)


// Server settings
app.listen(3333, () => {
    console.log('SERVER IS RUNNING ...')
});