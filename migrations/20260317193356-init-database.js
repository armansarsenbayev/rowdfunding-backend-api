'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Создаем таблицу Пользователей
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    // 2. Создаем таблицу Проектов
    await queryInterface.createTable('Projects', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING, allowNull: false },
      goal_amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      current_amount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
      deadline: { type: Sequelize.DATE, allowNull: false },
      status: { type: Sequelize.ENUM('active', 'successful', 'failed'), defaultValue: 'active' },
      userId: { 
        type: Sequelize.INTEGER, 
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'SET NULL'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    // 3. Создаем таблицу Наград (Тиров)
    await queryInterface.createTable('RewardTiers', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING, allowNull: false },
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      quantity_total: { type: Sequelize.INTEGER, allowNull: false },
      quantity_remaining: { type: Sequelize.INTEGER, allowNull: false },
      project_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Projects', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    // 4. Создаем таблицу Донатов (Pledges)
    await queryInterface.createTable('Pledges', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
      project_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Projects', key: 'id' } },
      tier_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'RewardTiers', key: 'id' } },
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      status: { type: Sequelize.ENUM('pledged', 'captured', 'refunded'), defaultValue: 'pledged' },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    // 5. Создаем таблицу Возвратов (Refunds)
    await queryInterface.createTable('Refunds', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      pledge_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Pledges', key: 'id' } },
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      status: { type: Sequelize.ENUM('pending', 'completed', 'failed'), defaultValue: 'completed' },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Refunds');
    await queryInterface.dropTable('Pledges');
    await queryInterface.dropTable('RewardTiers');
    await queryInterface.dropTable('Projects');
    await queryInterface.dropTable('Users');
  }
};