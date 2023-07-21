const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experience_level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  technology_stack: {
    type: DataTypes.STRING,
  },
  business_unit: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
