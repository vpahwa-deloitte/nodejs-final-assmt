const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Company = require('./Company');

const Hackathon = sequelize.define('Hackathon', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  max_participants: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  registration_open: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  registration_start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  registration_end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  technology_stack: {
    type: DataTypes.STRING,
  },
  registered_participants: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

Hackathon.belongsTo(Company, { foreignKey: 'company_id' });

module.exports = Hackathon;
