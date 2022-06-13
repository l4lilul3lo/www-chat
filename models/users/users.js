const db = require("../../db/dbConfig");

async function addUserDB(username, password) {
  const res = await db.query(
    `
  INSERT INTO users (name, password)
  VALUES($1, $2) RETURNING id
  `,
    [username, password]
  );
  return res.rows[0].id;
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
    SELECT name, image FROM users
  `);
  return res.rows;
}

async function getUserDB(user_id) {
  const res = await db.query(
    `
    SELECT users.id, users.name, users.image, users_settings.message_color, users_settings.message_background FROM users
    JOIN users_settings ON users.id = users_settings.user_id
    WHERE users.id = $1
  `,
    [user_id]
  );
  return res.rows[0];
}

module.exports = {
  addUserDB,
  getUserByIdDB,
  getUserByNameDB,
  getUsersDB,
  getUserDB,
};
