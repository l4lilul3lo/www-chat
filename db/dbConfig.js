const { Pool } = require("pg");
// const DB_USER = "postgres";
// const DB_PASSWORD = "password";
// const DB_HOST = "localhost";
// const DB_PORT = "5432";
// const DB_DATABASE = "www_chat";
console.log("process env db_host", process.env.DB_HOST);
console.log("process env password", process.env.DB_PASSWORD);
const isProduction = process.env.DATABASE_URL;
console.log("isProduction", isProduction);
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const pool = isProduction
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({ connectionString });

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
};
