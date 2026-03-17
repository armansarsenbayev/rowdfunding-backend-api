const sequelize = require('../config/database');
const { Project, RewardTier, Pledge } = require('../models');
class PledgeController {
  async createPledge(req, res) {
    const { id } = req.params;
    const { userId, tierId, amount } = req.body;
    
    const t = await sequelize.transaction();

    try {
      const project = await Project.findByPk(id, { transaction: t });
      
      if (!project) throw new Error('Project not found');
      if (new Date() > new Date(project.deadline)) throw new Error('Project is closed');

      if (tierId) {
        const tier = await RewardTier.findByPk(tierId, { transaction: t });
        
        if (!tier || tier.project_id !== project.id) throw new Error('Invalid reward tier');
        if (tier.quantity_remaining <= 0) throw new Error('Tier sold out');
        
        await tier.decrement('quantity_remaining', { by: 1, transaction: t });
      }

      const pledge = await Pledge.create({
        user_id: userId,
        project_id: id,
        tier_id: tierId || null,
        amount: amount
      }, { transaction: t });

      await project.increment('current_amount', { by: amount, transaction: t });

      await t.commit();
      res.status(201).json(pledge);
      
    } catch (error) {
      await t.rollback();
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new PledgeController();