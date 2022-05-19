const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const db = require("./dbConfig");
const { addUserDB } = require("../models/users/user");
const { addRoomDB } = require("../models/rooms/rooms");

function createUsername() {
  const randomName = faker.name.findName();
  return randomName;
}

async function createPassword() {
  const password = faker.random.word();
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function createMessage() {
  const randomMessage = faker.lorem.text();
  console.log(randomMessage);
  return randomMessage;
}

function createRoomName() {
  const randomRoomName = faker.word.adjective();
  return randomRoomName;
}

async function addUsers(amt) {
  for (let i = 0; i <= amt; i++) {
    const username = createUsername();
    const password = await createPassword();
    await addUserDB(username, password);
  }
  console.log("added users to the database");
  const users = await db.query(`select * from users`);
  console.log(users.rows);
}

async function addRooms(amt) {
  for (let i = 0; i <= amt; i++) {
    const roomName = createRoomName();
    const password = i % 2 === 0 ? "" : await createPassword();
    await addRoomDB(roomName, password);
  }
  console.log("added rooms to the database");
  const rooms = await db.query(`select * from rooms`);
  console.log(rooms.rows);
}

addUsers(4);
addRooms(4);
