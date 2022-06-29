const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const db = require("./dbConfig");
const { addUserDB } = require("../models/users/users");
const { createRoomDB } = require("../models/room");

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

  const users = await db.query(`select * from users`);
}

async function addRooms(amt) {
  for (let i = 0; i <= amt; i++) {
    const name = createRoomName();
    const password = i % 2 === 0 ? "" : await createPassword();
    await createRoomDB({ name, password });
  }

  const rooms = await db.query(`select * from rooms`);
}

addUsers(4);
addRooms(4);
