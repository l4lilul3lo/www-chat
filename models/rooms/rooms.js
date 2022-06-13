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

async function getRoomsDB() {
  const res = await db.query(`
    SELECT id, name FROM rooms
  `);

  return res.rows;
}

async function getRoomIdDB(roomName) {
  const res = await db.query(
    `
    SELECT id from rooms
    WHERE name = $1
  `,
    [roomName]
  );

  return res.rows[0].id;
}

async function getCafeIdDB() {
  const res = await db.query(`
    SELECT id from rooms
    WHERE name = 'cafe'
  `);
  return res.rows[0].id;
}

module.exports = { addRoomDB, getRoomsDB, getRoomIdDB, getCafeIdDB };
