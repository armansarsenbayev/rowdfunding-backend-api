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
  // GET /projects (получить список всех проектов)
  async getAllProjects(req, res) {
    try {
      const projects = await Project.findAll();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // GET /projects/:id (сразу подтягиваем награды через Eager Loading!)
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

  // POST /projects/:id/tiers
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
      // Ищем проект и сразу подтягиваем все его донаты и награды
      const project = await Project.findByPk(id, {
        include: [
          { model: Pledge }, 
          { model: RewardTier, as: 'tiers' }
        ],
        transaction: t
      });

      if (!project) throw new Error('Project not found');
      if (project.status !== 'active') throw new Error('Project is already finalized');

      // Проверяем, собрали ли мы нужную сумму (Сравниваем числа)
      const isSuccessful = parseFloat(project.current_amount) >= parseFloat(project.goal_amount);

      if (isSuccessful) {
        // УСПЕХ: Проект состоялся
        await project.update({ status: 'successful' }, { transaction: t });
        // Списываем деньги со всех донатеров (статус captured)
        await Pledge.update({ status: 'captured' }, { where: { project_id: id }, transaction: t });
      } else {
        // ПРОВАЛ: Проект не собрал деньги
        await project.update({ status: 'failed' }, { transaction: t });

        // Запускаем процесс возврата для каждого доната
        for (const pledge of project.Pledges) {
          await pledge.update({ status: 'refunded' }, { transaction: t }); // Меняем статус доната

          await Refund.create({ // Выписываем чек о возврате
            pledge_id: pledge.id,
            amount: pledge.amount,
            status: 'completed'
          }, { transaction: t });

          // Если человек донатил за награду, возвращаем ее на склад
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