const Sequelize = require("sequelize");

require("dotenv").config();
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

// i'll need to update this when deploying to heroku
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

module.exports = sequelize;
