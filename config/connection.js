// important the Sequelize constructor from the library
const Sequelize = require('sequelize');
require('dotenv').config(); 

// create connection to our database
const sequelize = new Sequelize(process.env.DB_name, process.env.DB_user, process.env.DB_pass, {
    host: 'localhost',
    dialect: 'mysql',
    post: 3306
});

module.exports = sequelize;