const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-ecommerce-app', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
