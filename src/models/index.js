const sequelize = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const RewardTier = require('./RewardTier');
const Pledge = require('./Pledge');
const Refund = require('./Refund')

Project.hasMany(RewardTier, { foreignKey: 'project_id', as: 'tiers' });
RewardTier.belongsTo(Project, { foreignKey: 'project_id' });

User.hasMany(Project, { foreignKey: 'userId', as: 'projects' });
Project.belongsTo(User, { as: 'creator', foreignKey: 'userId' });

Project.hasMany(Pledge, { foreignKey: 'project_id' });
Pledge.belongsTo(Project, { foreignKey: 'project_id' });

User.hasMany(Pledge, { foreignKey: 'user_id' });
Pledge.belongsTo(User, { foreignKey: 'user_id' });

RewardTier.hasMany(Pledge, { foreignKey: 'tier_id' });
Pledge.belongsTo(RewardTier, { foreignKey: 'tier_id' });

Pledge.hasOne(Refund, { foreignKey: 'pledge_id' });
Refund.belongsTo(Pledge, { foreignKey: 'pledge_id' });

module.exports = {
  sequelize,
  User,
  Project,
  RewardTier,
  Pledge,
  Refund
};