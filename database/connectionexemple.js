const Sequelize = require('sequelize');

const connection = new Sequelize('[database]', '[user]', '[password]', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = connection;