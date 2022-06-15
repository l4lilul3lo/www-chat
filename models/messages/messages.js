const db = require("../../db/dbConfig");

const text = `SELECT users.image, users.name as author, messages.color, messages.background, messages.content, messages.created_at FROM messages
JOIN users ON users.id = messages.user_id
WHERE messages.room_id = $1
ORDER BY messages.created_at DESC
LIMIT 40
`;

// CREATE TABLE IF NOT EXISTS messages (
//   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
//   user_id uuid REFERENCES users(id) NOT NULL,
//   room_id uuid REFERENCES rooms(id) NOT NULL,
//   content VARCHAR(255) NOT NULL,
//   color VARCHAR(255) NOT NULL,
//   background VARCHAR(255) NOT NULL,
//   created_at TIMESTAMP DEFAULT DATE_TRUNC('minute', CURRENT_TIMESTAMP)
// );
// const rightText = `SELECT user.name, room.name`

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
