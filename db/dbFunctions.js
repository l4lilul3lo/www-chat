const db = require("./dbConfig");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("./dbConfig");
const { User } = require("../models/user");
const { RoomsUsers } = require("../models/roomsUsers");
const { Room } = require("../models/room");
const { Message } = require("../models/message");
const { Settings } = require("../models/settings");
const { createUsers, createRooms, createMessages } = require("./dataGenerator");
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
  await sequelize.close();
}

async function createTables() {
  try {
    await createTable(User);
    await createTable(Room);
    await createTable(Message);
    await createTable(RoomsUsers);
    await createTable(Settings);

    await sequelize.close();
  } catch (err) {}
}

async function populateTable(model, dataArray) {
  try {
    const res = await model.bulkCreate(dataArray);

    const rowIds = res.map((x) => x.dataValues.id);
    return rowIds;
  } catch (error) {}
}

async function seedDB() {
  const users = createUsers(10);
  const userIds = await populateTable(User, users);

  const rooms = createRooms(4);
  const roomIds = await populateTable(Room, rooms);

  const messages = createMessages(userIds, roomIds, 30);
  const messageIds = await populateTable(Message, messages);

  await sequelize.close();
}

async function resetDB() {
  await dropTables();
  console.log("tables dropped");
  await createTables();
  console.log("tables created");
  await seedDB();
  console.log("tables populated");
}

module.exports = { createTables, dropTables, seedDB, resetDB };
