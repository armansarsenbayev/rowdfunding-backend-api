require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');

const User = require('./src/models/User');
const Project = require('./src/models/Project');
const RewardTier = require('./src/models/RewardTier'); 
const Pledge = require('./src/models/Pledge');
require('./src/models');

const userRoutes = require('./src/routes/userRoutes');
const projectRoutes = require('./src/routes/projectRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Crowdfunding API is running...');
});

app.use('/projects', projectRoutes);
app.use('/users', userRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log(' Connection to the database has been established successfully.');
        
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