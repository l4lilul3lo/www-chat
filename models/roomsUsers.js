const { sequelize } = require("../db/dbConfig");
const { uuidPrimaryKey } = require("./sharedColumns");
const { DataTypes } = require("sequelize");
const { User } = require("./user");
const { Room } = require("./room");
const RoomsUsers = sequelize.define("rooms_users", {
  id: uuidPrimaryKey,
  privilege: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isFavorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isBanned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

async function createRoomUserDB(userId, roomId, privilege) {
  if (privilege) {
    return await RoomsUsers.create({ userId, roomId, privilege });
  }
  await RoomsUsers.create({ userId, roomId });
}

async function getRoomUserInfoDB(userId, roomId) {
  const res = await RoomsUsers.findOne({
    where: { userId, roomId },
  });
  return res?.dataValues;
}

async function getUsersDB(roomId) {
  const res = await User.findAll({
    include: [
      {
        model: Room,
        through: {
          attributes: ["name", "image"],
        },
      },
    ],
  });
}

User.belongsToMany(Room, {
  through: RoomsUsers,
});
Room.belongsToMany(User, {
  through: RoomsUsers,
});

module.exports = {
  RoomsUsers,
  getUsersDB,
  getRoomUserInfoDB,
  createRoomUserDB,
};
