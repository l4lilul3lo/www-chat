const db = require("../../db/dbConfig");

async function getUserSettingsDB(user_id) {
  const res = await db.query(
    `
    SELECT * FROM users_settings WHERE user_id=$1
  `,
    [user_id]
  );
  return res.rows[0];
}
