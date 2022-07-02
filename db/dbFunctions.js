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
} = require("../utils/dataGenerator");

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
  return schema;
}

async function tableExists(tableName) {
  const res = await sequelize.query(selectExistsText, {
    replacements: [tableName],
    type: QueryTypes.SELECT,
  });

  return res[0].exists;
}

async function createTable(model) {
  const tableName = model.tableName;
  const exists = await tableExists(tableName);
  if (exists) {
    console.log(`${tableName} already exists`);
  } else {
    await model.sync();
    const schema = await getSchema(tableName);
    console.log(`${tableName} table created.`.magenta);
    console.log(schema);
  }
}

async function dropTables() {
  await sequelize.drop();
  console.log("tables dropped".magenta);
}

async function createTables() {
  try {
    await createTable(User);
    await createTable(Room);
    await createTable(Message);
    await createTable(RoomsUsers);
    await createTable(Settings);
  } catch (err) {
    throw new Error(err);
  }
}

async function populateTable(model, dataArray) {
  try {
    const res = await model.bulkCreate(dataArray);
    const rowIds = res.map((x) => x.dataValues.id);
    return rowIds;
  } catch (err) {
    throw new Error(err);
  }
}

async function populateTables() {
  const users = createUsers(10);
  const userIds = await populateTable(User, users);
  const rooms = createRooms(4);
  const roomIds = await populateTable(Room, rooms);
  const messages = createMessages(userIds, roomIds, 30);
  await populateTable(Message, messages);
  console.log("tables populated".magenta);
}

async function resetDB() {
  await dropTables();
  await createTables();
  await populateTables();
}

module.exports = { resetDB };
