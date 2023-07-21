const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');
const companyRoutes = require('./routes/companyRoutes');
const hackathonRoutes = require('./routes/hackathonRoutes');
const participantsRoutes = require('./routes/participantsRoutes');

(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
})();

const app = express();

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/companies', companyRoutes);
app.use('/hackathons', hackathonRoutes);
app.use('/participants', participantsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
