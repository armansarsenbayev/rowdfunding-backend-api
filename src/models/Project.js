const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Project = sequelize.define('Project', {
  title: { type: DataTypes.STRING, allowNull: false },
  goal_amount: { type: DataTypes.DECIMAL, allowNull: false },
  deadline: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.ENUM('active', 'successful', 'failed'), defaultValue: 'active' }
});

Project.belongsTo(User, { as: 'creator', foreignKey: 'userId' });
module.exports = Project;