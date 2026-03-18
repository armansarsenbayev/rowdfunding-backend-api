const express = require('express');
const router = express.Router();

// Импортируем контроллеры
const projectController = require('../controllers/projectController');
const pledgeController = require('../controllers/pledgeController');

// 1. Получить список всех проектов
router.get('/', projectController.getAllProjects);

// 2. Создать новый проект
router.post('/', projectController.createProject);

// 3. Получить один проект по ID (со всеми наградами)
router.get('/:id', projectController.getProject);

// 4. Добавить награду (Tier) к проекту
router.post('/:id/tiers', projectController.addRewardTier);

// 5. Подвести итоги проекта (Успех или Провал)
router.post('/:id/finalize', projectController.finalizeProject);

// 6. Сделать донат (Pledge) в проект
router.post('/:id/pledges', pledgeController.createPledge);

module.exports = router;