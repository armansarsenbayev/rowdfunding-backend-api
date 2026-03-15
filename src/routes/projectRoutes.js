const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: ['creator', 'tiers'] 
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    
    const { title, goal_amount, deadline, userId } = req.body;
    
    const project = await Project.create({
      title,
      goal_amount,
      deadline,
      userId 
    });
    
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const result = await Project.destroy({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    
    await project.update(req.body);
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;