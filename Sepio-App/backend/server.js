const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loggerMiddleware = require('./loggerMiddleware');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/sequelize');
const http = require('http');
const WebSocket = require('ws');
const winston = require('winston');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// MySQL connection
sequelize
  .authenticate()
  .then(() => console.log('Connected to MySQL'))
  .catch((err) => console.error('Error connecting to MySQL:', err));


  // Set up WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket connection handler
wss.on('connection', (ws) => {
  // Передача логів на клієнт 
  logger.on('log', (info) => {
    ws.send(JSON.stringify(info));
  });
});
const logger = require('./logger');

app.get('/logs', (req, res) => {
  //Читання лог файлів і передача 

  // Демо 
  res.json({ message: 'Logs endpoint is under development' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
