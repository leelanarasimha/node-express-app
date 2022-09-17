const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Category = sequelize.define(
  'category',
  {
    id: {
      type: DataTypes.BIGINT,
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
  },
  { tableName: 'categories' }
);

module.exports = Category;
