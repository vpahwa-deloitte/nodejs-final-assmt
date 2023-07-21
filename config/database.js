const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hashathon', 'postgres', 'jain1234', {
  host: 'localhost',
  dialect: 'postgres',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
