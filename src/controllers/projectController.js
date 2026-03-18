const { Project, RewardTier, Pledge, Refund } = require('../models');
const sequelize = require('../config/database');

class ProjectController {
  async createProject(req, res) {
    try {
      const project = await Project.create(req.body);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getAllProjects(req, res) {
    try {
      const projects = await Project.findAll();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getProject(req, res) {
    try {
      const project = await Project.findByPk(req.params.id, {
        include: [{ model: RewardTier, as: 'tiers' }]
      });
      if (!project) return res.status(404).json({ error: 'Not found' });
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addRewardTier(req, res) {
    try {
      const data = { ...req.body, project_id: req.params.id, quantity_remaining: req.body.quantity_total };
      const tier = await RewardTier.create(data);
      res.status(201).json(tier);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // POST /projects/:id/finalize
  async finalizeProject(req, res) {
    const { id } = req.params;
    const t = await sequelize.transaction();

    try {
      const project = await Project.findByPk(id, {
        include: [
          { model: Pledge }, 
          { model: RewardTier, as: 'tiers' }
        ],
        transaction: t
      });

      if (!project) throw new Error('Project not found');
      if (project.status !== 'active') throw new Error('Project is already finalized');

      const isSuccessful = parseFloat(project.current_amount) >= parseFloat(project.goal_amount);

      if (isSuccessful) {
        await project.update({ status: 'successful' }, { transaction: t });
        await Pledge.update({ status: 'captured' }, { where: { project_id: id }, transaction: t });
      } else {
        await project.update({ status: 'failed' }, { transaction: t });

        for (const pledge of project.Pledges) {
          await pledge.update({ status: 'refunded' }, { transaction: t }); 

          await Refund.create({ 
            pledge_id: pledge.id,
            amount: pledge.amount,
            status: 'completed'
          }, { transaction: t });

          if (pledge.tier_id) {
            const tier = project.tiers.find(t => t.id === pledge.tier_id);
            if (tier) {
              await tier.increment('quantity_remaining', { by: 1, transaction: t });
            }
          }
        }
      }

      await t.commit();
      res.json({ 
        message: `Project finalized as ${isSuccessful ? 'SUCCESSFUL' : 'FAILED'}`, 
        project_status: isSuccessful ? 'successful' : 'failed' 
      });

    } catch (error) {
      await t.rollback();
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProjectController();