const db = require("../../db/dbConfig");

async function addRoomDB(name, password = "") {
  db.query(
    `
  INSERT INTO rooms (name, password)
  VALUES ($1, $2)
  `,
    [name, password]
  );
}

module.exports = { addRoomDB };
