const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Project = sequelize.define('Project', {
  title: { 
  type: DataTypes.STRING, 
  allowNull: false,
  validate: { notEmpty: true } 
},
goal_amount: { 
  type: DataTypes.DECIMAL, 
  allowNull: false,
  validate: { min: 1 } 
},
  deadline: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.ENUM('active', 'successful', 'failed'), defaultValue: 'active' }
});

module.exports = Project;