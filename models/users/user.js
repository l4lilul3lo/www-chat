const db = require("../../db/dbConfig");

const getUserByIDB = async (user_id) => {
  const res = await db.query("SELECT * FROM users WHERE id=$1", [user_id]);
  return res.rows[0];
};

module.exports = { getUserByIdDB };
