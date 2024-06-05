const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    role: {
        type: DataTypes.ENUM('Regular', 'Admin', 'RootAdmin'),
        defaultValue: 'Regular',
    }
}, {
    timestamps: true,
});

module.exports = User;
