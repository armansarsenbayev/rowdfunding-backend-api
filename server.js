const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
require('dotenv').config();
const User = require('./src/models/User');
const Project = require('./src/models/Project');
const RewardTier = require('./src/models/RewardTier'); 


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json()); 


app.get('/', (req, res) => {
  res.send('Crowdfunding API is running...');
});


const projectRoutes = require('./src/routes/projectRoutes');
app.use('/projects', projectRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log(' Connection to the database has been established successfully.');
    
    
    await sequelize.sync({ alter: true }); 
    
    app.listen(PORT, () => {
      console.log(` Server started on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' Unable to connect to the database:', error);
  }
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

startServer();