const { Sequelize } = require("sequelize");
const development = process.env.NODE_ENV === "development";
const localString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const herokuString = process.env.DATABASE_URL;
const connectionString = development ? localString : herokuString;
const dialectOptions = development
  ? {}
  : { ssl: { required: true, rejectUnauthorized: false } };
const sequelize = new Sequelize(connectionString, {
  dialectOptions,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = { sequelize };
