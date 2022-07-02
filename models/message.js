const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");
const { uuidPrimaryKey } = require("./sharedColumns");
const { Room } = require("./room");
const { User } = require("./user");
// a message has one user, and one room.
const Message = sequelize.define("message", {
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
});

// reference user
User.hasMany(Message);
Message.belongsTo(User);

Room.hasMany(Message);
Message.belongsTo(Room);

async function getMessagesDB(roomId) {
  const messages = await Message.findAll({
    raw: true,
    nest: true,
    include: [{ model: User, attributes: ["name", "image"] }],
    where: { roomId },
    attributes: ["content", "color", "background", "createdAt"],
    order: [["createdAt", "ASC"]],
    limit: 40,
  });

  return messages;
}

async function createMessageDB(messageObj) {
  await Message.create(messageObj);
}

module.exports = { Message, createMessageDB, getMessagesDB };
