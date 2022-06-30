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
  is_favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_blocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

async function joinRoomDB(userId, roomId) {
  RoomsUsers.create({ userId, roomId });
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

module.exports = { RoomsUsers, getUsersDB, joinRoomDB };
