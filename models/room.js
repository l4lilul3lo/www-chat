const { sequelize } = require("../db/dbConfig");
const { uuidPrimaryKey } = require("./sharedColumns");
const { DataTypes } = require("sequelize");
const Room = sequelize.define("room", {
  id: uuidPrimaryKey,
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 32],
    },
  },
  password: {
    type: DataTypes.STRING,
  },
  passwordProtected: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

async function createRoomDB(roomObj) {
  console.log("roomObj in createRoom db", roomObj);
  const roomInfo = roomObj.password
    ? { ...roomObj, passwordProtected: true }
    : roomObj;
  const res = await Room.create(roomInfo);
  const { id, name, passwordProtected } = res.dataValues;
  return { id, name, passwordProtected };
}

async function getRoomByNameDB(roomName) {
  const res = await Room.findOne({
    where: {
      name: roomName,
    },
    attributes: ["id", "name"],
  });

  return res?.dataValues;
}

async function getRoomsDB() {
  const res = await Room.findAll({
    attributes: ["id", "name", "passwordProtected"],
  });

  return res;
}

async function getRoomByIdDB(roomId) {
  console.log("roomId", roomId);
  const res = await Room.findOne({
    where: {
      id: roomId,
    },
  });

  return res?.dataValues;
}

async function getCafeInfoDB() {
  const res = await Room.findOne({
    where: {
      name: "cafe",
    },
    attributes: ["name", "id"],
  });
  return res.dataValues;
}

module.exports = {
  Room,
  createRoomDB,
  getRoomsDB,
  getRoomByIdDB,
  getCafeInfoDB,
  getRoomByNameDB,
};
