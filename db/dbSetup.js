const db = require("./dbConfig");

const addUUIDExtenstion = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
`;

const createRoomsText = `
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(32) NOT NULL CHECK (length(name) >= 2),
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT DATE_TRUNC('minute', CURRENT_TIMESTAMP)
);`;

const createUsersText = `
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(32) NOT NULL CHECK (length(name) >= 2),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT DATE_TRUNC('minute', CURRENT_TIMESTAMP)
);
`;

const createRoomsUsersText = `
CREATE TABLE IF NOT EXISTS rooms_users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id),
  room_id uuid NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  priviledge INTEGER DEFAULT 0,
  is_favorite BOOLEAN DEFAULT FALSE,
  is_blocked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT DATE_TRUNC('minute', CURRENT_TIMESTAMP)
);
`;

const createUsersSettingsText = `
CREATE TABLE IF NOT EXISTS users_settings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_color VARCHAR(32) DEFAULT 'black',
  message_background VARCHAR(32) DEFAULT 'none',
  user_id uuid REFERENCES users(id) NOT NULL
);
`;

const createMessagesText = `
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) NOT NULL,
  room_id uuid REFERENCES rooms(id) NOT NULL,
  content VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT DATE_TRUNC('minute', CURRENT_TIMESTAMP)
);
`;

createUser = `
  INSERT INTO users (name, password)
  VALUES ('john', 'abc123456') RETURNING id
`;

createRoom = `
  INSERT INTO rooms (name) 
  VALUES ('main') RETURNING id
`;

userJoin = `
INSERT INTO rooms_users (user_id, room_id)
VALUES ($1, $2)
`;

createMessage = `
INSERT INTO messages (user_id, room_id, content)
VALUES ($1, $2, $3)
`;

async function getSchema(tableName) {
  const schema = await db.query(
    `
  SELECT
  column_name,
  data_type
FROM
  information_schema.columns
WHERE
  table_name = $1;
  `,
    [tableName]
  );

  return schema.rows;
}

async function tableExists(tableName) {
  const res = await db.query(
    `
  SELECT EXISTS (
    SELECT FROM 
        pg_tables
    WHERE 
        schemaname = 'public' AND 
        tablename  = $1
    );
  `,
    [tableName]
  );
  return res.rows[0].exists;
}

async function createTable(tableName, text) {
  const exists = await tableExists(tableName);
  if (exists) {
    console.log(`${tableName} already exists`);
  } else {
    await db.query(text);
    console.log(`${tableName} table created`);
    const schema = await getSchema(tableName);
    console.log(schema);
  }
}

async function createTables() {
  try {
    console.log("BEGINNING TABLE CREATION!");

    await db.query(addUUIDExtenstion);
    console.log("uuid-ossp extension added.");

    await createTable("rooms", createRoomsText);
    // add required main room.
    await db.query(`INSERT INTO rooms (name, password) VALUES ($1, $2)`, [
      "cafe",
      "",
    ]);

    await createTable("users", createUsersText);
    await createTable("rooms_users", createRoomsUsersText);
    await createTable("users_settings", createUsersSettingsText);
    await createTable("messages", createMessagesText);

    console.log("TABLE CREATION COMPLETE!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { createTables };
