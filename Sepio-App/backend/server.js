const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
}).catch((error) => {
    console.log('Error syncing database:', error);
});

