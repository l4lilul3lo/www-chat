const { sequelize } = require("../db/dbConfig");
const { uuidPrimaryKey } = require("./sharedColumns");
const { DataTypes } = require("sequelize");
const { User } = require("./user");
const { Room } = require("./room");
const RoomsUsers = sequelize.define("rooms_users", {
  id: uuidPrimaryKey,
  priviledge: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isFavorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

async function createRoomUserDB(userId, roomId) {
  await RoomsUsers.create({ userId, roomId });
}

async function getRoomUserInfoDB(userId, roomId) {
  console.log("userId in roomsusers", userId);
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
