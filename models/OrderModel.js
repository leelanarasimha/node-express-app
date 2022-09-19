const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
});

module.exports = Order;
