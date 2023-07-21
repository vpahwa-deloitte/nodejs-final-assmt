const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Hackathon = require('./Hackathon');

const Participant = sequelize.define('Participant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

// Associations
User.hasMany(Participant);
Participant.belongsTo(User);

Hackathon.hasMany(Participant);
Participant.belongsTo(Hackathon);

module.exports = Participant;
