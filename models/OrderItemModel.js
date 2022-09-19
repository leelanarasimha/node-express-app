const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const OrderItem = sequelize.define('orderItem', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER
  }
});

module.exports = OrderItem;
