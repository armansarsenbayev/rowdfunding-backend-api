const { Sequelize } = require('sequelize'); 

// Временно пишем данные напрямую, чтобы обойти глюк с .env
const sequelize = new Sequelize(
  'crowdfunding_db', // Твое точное название базы из pgAdmin
  'postgres',        // Имя пользователя (обычно postgres)
  '1234',     // Твой реальный пароль от базы (в кавычках!)
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;