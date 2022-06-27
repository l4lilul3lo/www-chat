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
  console.log("roomId in getMessagesDB", roomId);
  const messages = await Message.findAll({
    include: [{ model: User, attributes: ["name", "image"] }],
    where: { room_id: roomId },
    order: [["color", "DESC"]],
    limit: 40,
  });
  messages.forEach((message) => console.log(message.dataValues.color));
  return messages;
}

async function addMessageDB(userId, roomId, content, color, background) {
  console.log("room id: ", roomId);
  console.log("user id: ", userId);
  console.log("content", content);
  console.log("color: ", color);
  console.log("background", background);

  await Message.create({
    user_id: userId,
    room_id: roomId,
    content,
    color,
    background,
  });
}

module.exports = { Message, addMessageDB, getMessagesDB };
