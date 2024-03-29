const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const messageColors = ["red", "blue", "green", "black"];
const messageBackgrounds = ["purple", "yellow", "brown", "white"];

function arrRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function createUsername() {
  const randomName = faker.name.findName();
  return randomName;
}

function createHashedPassword(password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
}

function createRoomName() {
  const adjective = faker.word.adjective();
  const noun = faker.word.noun();
  const name = `${adjective} ${noun}`;
  return name;
}

function createImage() {
  return faker.image.avatar();
}

function createHex() {
  return faker.color.rgb({ format: "hex", casing: "lower" });
}

function createUsers(n) {
  const users = [...new Array(n)].map((x) => {
    const name = createUsername();
    const password = createHashedPassword(faker.random.word());
    const image = createImage();
    return { name, password, image };
  });

  users.push({ name: "dev", password: createHashedPassword("123") });

  return users;
}

function createRooms(n) {
  const mainRoom = { name: "cafe" };
  const otherRooms = [...new Array(n - 1)].map((x, i) => {
    const name = createRoomName();
    if ([1, 3, 5].includes(i)) {
      return {
        name,
        password: createHashedPassword(faker.random.word()),
        passwordProtected: true,
      };
    }
    return { name };
  });
  return [mainRoom, ...otherRooms];
}

function createMessageContent() {
  const randomMessage = faker.lorem.text();
  return randomMessage;
}

function createSettings(userIds) {
  const settings = userIds.map((userId) => {
    const messageColor = createHex();
    const messageBackground = createHex();
    return { userId, messageColor, messageBackground };
  });
  return settings;
}

function createMessages(userIds, roomIds, n) {
  const messages = [...new Array(n)].map((x) => {
    const content = createMessageContent();
    const color = arrRandom(messageColors);
    const background = arrRandom(messageBackgrounds);
    const userId = arrRandom(userIds);
    const roomId = arrRandom(roomIds);
    return { content, color, background, userId, roomId };
  });
  return messages;
}

module.exports = {
  createUsers,
  createRooms,
  createMessages,
  createUsername,
  createHashedPassword,
  createSettings,
};
