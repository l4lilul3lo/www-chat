const db = require("./dbConfig");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("./dbConfig");
const { User } = require("../models/user");
const { RoomsUsers } = require("../models/roomsUsers");
const { Room } = require("../models/room");
const { Message } = require("../models/message");
const { Settings } = require("../models/settings");
const {
  createUsers,
  createRooms,
  createMessages,
  createHashedPassword,
} = require("../utils/dataGenerator");
const { arrRandom } = require("../utils/general");
const colors = require("colors");

const selectExistsText = `
SELECT EXISTS (
  SELECT FROM 
      pg_tables
  WHERE 
      schemaname = 'public' AND 
      tablename  = ?
  );
`;

async function getSchema(tableName) {
  const schema = await sequelize.query(
    `
  SELECT
  column_name,
  data_type
FROM
  information_schema.columns
WHERE
  table_name = :name;
  `,
    {
      replacements: { name: tableName },
      type: QueryTypes.SELECT,
    }
  );
}

async function tableExists(tableName) {
  const res = await sequelize.query(selectExistsText, {
    replacements: [tableName],
    type: QueryTypes.SELECT,
  });

  return res[0].exists;
}

async function createTable(model) {
  const exists = await tableExists(model.tableName);
  if (exists) {
  } else {
    await model.sync();
  }
}

async function dropTables() {
  await sequelize.drop();
}

async function createTables() {
  try {
    await createTable(User);
    await createTable(Room);
    await createTable(Message);
    await createTable(RoomsUsers);
    await createTable(Settings);
  } catch (err) {}
}

async function populateTable(model, dataArray) {
  try {
    const res = await model.bulkCreate(dataArray);
    console.log("RES", res);
    const rowIds = res.map((x) => x.dataValues.id);
    console.log("ROW IDS", rowIds);
    return rowIds;
  } catch (error) {
    console.log(error);
  }
}

async function seedDB() {
  const users = createUsers(10);
  console.log("USERS", users);
  const userIds = await populateTable(User, users);

  const rooms = createRooms(4);
  console.log("ROOMS", rooms);
  const roomIds = await populateTable(Room, rooms);
  console.log("USER IDS", userIds);
  console.log("ROOM IDS", roomIds);
  const messages = createMessages(userIds, roomIds, 30);
  const messageIds = await populateTable(Message, messages);
}

async function resetDB() {
  await dropTables();
  console.log("tables dropped");
  await createTables();
  console.log("tables created");
  await seedDB();
  console.log("tables populated");
  await sequelize.close();
}

module.exports = { createTables, dropTables, seedDB, resetDB };
