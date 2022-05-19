const db = require("../../db/dbConfig");

async function addUserDB(username, password) {
  db.query(
    `
  INSERT INTO users (name, password)
  VALUES($1, $2)
  `,
    [username, password]
  );
}

module.exports = { addUserDB };
