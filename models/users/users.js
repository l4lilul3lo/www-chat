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

const getUserByIdDB = async (user_id) => {
  const res = await db.query("SELECT * FROM users WHERE id=$1", [user_id]);
  return res.rows[0];
};

async function getUserByNameDB(name) {
  const res = await db.query(
    `
    SELECT * FROM users WHERE name=$1
  `,
    [name]
  );
  return res.rows[0];
}

async function getUsersDB() {
  const res = await db.query(`
    SELECT * FROM users
  `);
  return res.rows;
}

module.exports = { addUserDB, getUserByIdDB, getUserByNameDB, getUsersDB };
