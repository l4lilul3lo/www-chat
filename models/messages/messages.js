const db = require("../../db/dbConfig");

const text = `SELECT users.name, messages.content, messages.created_at FROM messages
JOIN users ON users.id = messages.user_id
WHERE messages.room_id = $1
LIMIT 40
`;

async function getLastFourty() {
  const res = await db.query(text, ["2cb5d9da-c3b8-43ea-8cc1-c78b768945bf"]);
  return res.rows;
}

module.exports = { getLastFourty };
