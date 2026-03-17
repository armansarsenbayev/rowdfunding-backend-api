const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./Project');

const RewardTier = sequelize.define('RewardTier', {
  title: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.DECIMAL, allowNull: false },
  quantity_total: { type: DataTypes.INTEGER, allowNull: false },
  quantity_remaining: { type: DataTypes.INTEGER, allowNull: false }
});



module.exports = RewardTier;