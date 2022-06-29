const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");
const { uuidPrimaryKey } = require("./sharedColumns");
const { Room } = require("./room");
const { User } = require("./user");
// a message has one user, and one room.
const Message = sequelize.define(
  "message",
  {
    id: uuidPrimaryKey,
    content: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: "black",
    },
    background: {
      type: DataTypes.STRING,
      defaultValue: "none",
    },
  },
  { underscored: true }
);

// reference user
User.hasMany(Message);
Message.belongsTo(User);

Room.hasMany(Message);
Message.belongsTo(Room);

async function getMessagesDB(roomId) {
  const messages = await Message.findAll({
    include: [{ model: User, attributes: ["name", "image"] }],
    where: { room_id: roomId },
    order: [["created_at", "DESC"]],
    limit: 40,
  });

  return messages;
}

async function addMessageDB(messageObj) {
  await Message.create(messageObj);
}

module.exports = { Message, addMessageDB, getMessagesDB };
