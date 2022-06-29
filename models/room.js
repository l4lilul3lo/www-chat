const { sequelize } = require("../db/dbConfig");
const { uuidPrimaryKey } = require("./sharedColumns");
const { DataTypes } = require("sequelize");
const Room = sequelize.define(
  "room",
  {
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
  },
  { underscored: true }
);

async function createRoomDB(roomObj) {
  Room.create(roomObj);
}

async function getRoomsDB() {
  const res = await Room.findAll({
    attributes: ["id", "name"],
  });

  return res;
}

async function getRoomByIdDB(roomId) {
  const res = Room.findAll({
    where: {
      id: roomId,
    },
  });
}

async function getCafeInfoDB() {
  const res = await Room.findAll({
    where: {
      name: "cafe",
    },
    attributes: ["name", "id"],
  });
  return res[0].dataValues;
}

module.exports = {
  Room,
  createRoomDB,
  getRoomsDB,
  getRoomByIdDB,
  getCafeInfoDB,
};
