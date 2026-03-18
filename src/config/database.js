const { Sequelize } = require('sequelize'); 

const sequelize = new Sequelize(
  'crowdfunding_db', 
  'postgres',        
  '1234',     
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;