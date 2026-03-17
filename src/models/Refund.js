const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Refund = sequelize.define('Refund', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  pledge_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  amount: { 
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false 
  },
  status: { 
    type: DataTypes.ENUM('pending', 'completed', 'failed'), 
    defaultValue: 'completed' 
  }
});

module.exports = Refund;