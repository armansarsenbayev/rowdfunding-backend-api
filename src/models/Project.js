const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Тебе нужно будет создать этот файл подключения

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  goal_amount: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  current_amount: {
    type: DataTypes.DECIMAL,
    defaultValue: 0
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'successful', 'failed'),
    defaultValue: 'active'
  }
});

module.exports = Project;