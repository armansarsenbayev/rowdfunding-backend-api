const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pledge = sequelize.define('Pledge', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false 
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false 
  },
  tier_id: {
    type: DataTypes.INTEGER,
    allowNull: true 
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false 
  },
  status: {
    type: DataTypes.ENUM('pledged', 'captured', 'refunded'),
    defaultValue: 'pledged' 
  }
});

module.exports = Pledge;