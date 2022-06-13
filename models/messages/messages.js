const db = require("../../db/dbConfig");

const text = `SELECT users.image, users.name, messages.color, messages.background, messages.content, messages.created_at FROM messages
JOIN users ON users.id = messages.user_id
WHERE messages.room_id = $1
ORDER BY messages.created_at DESC
LIMIT 40
`;

async function getMessagesDB(room_id) {
  const res = await db.query(text, [room_id]);
  console.log("roomId in messages db query", room_id);

  return res.rows;
}

async function addMessageDB(user_id, room_id, content, color, background) {
  console.log("addMessageDB arguments", room_id, user_id);
  console.log("room id: ", room_id);
  console.log("user id: ", user_id);
  console.log("content", content);
  console.log("color: ", color);
  console.log("background", background);
  db.query(
    `
    INSERT INTO messages (user_id, room_id, content, color, background)
    VALUES ($1, $2, $3, $4, $5)
  `,
    [user_id, room_id, content, color, background]
  );
}

module.exports = { getMessagesDB, addMessageDB };
