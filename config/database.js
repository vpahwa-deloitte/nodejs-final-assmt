const { Sequelize } = require("sequelize");

/* // local database
const sequelize = new Sequelize("hashathon", "postgres", "jain1234", {
  host: "localhost",
  dialect: "postgres",
}); */

// render database
const sequelize = new Sequelize(
  "hashathon_fhhm",
  "vpahwa",
  "kyqfW1YZJp9qQF8vOLPyCLyKsoiBpglw",
  {
    host: "dpg-citn885iuiedpv4qssc0-a.oregon-postgres.render.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
