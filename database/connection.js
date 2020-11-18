const Sequelize = require('sequelize');

const connection = new Sequelize('blog', 'root', 'yg7s-ecuj', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = connection;