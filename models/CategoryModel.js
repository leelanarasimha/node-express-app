const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Category;
