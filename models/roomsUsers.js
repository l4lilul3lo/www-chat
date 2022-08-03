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

async function createRoomUserDB(roomId, userId, privilege) {
  if (privilege) {
    return await RoomsUsers.create({ userId, roomId, privilege });
  }
  return await RoomsUsers.create({ userId, roomId });
}

async function getRoomUserDB(roomId, userId) {
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

async function updateRoomUserPrivilege(roomId, userId, privilege) {
  await RoomsUsers.update(
    { privilege },
    {
      where: {
        roomId,
        userId,
      },
    }
  );
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
  getRoomUserDB,
  createRoomUserDB,
  updateRoomUserPrivilege,
};
