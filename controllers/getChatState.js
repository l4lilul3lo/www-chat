const { getMessagesDB } = require("../models/messages/messages");
const { getRoomsDB } = require("../models/rooms/rooms");
const { getUsersDB } = require("../models/users/users");
const getChatState = async (req, res) => {
  const rooms = await getRoomsDB();
  const users = await getUsersDB();
  const messages = await getMessagesDB();
  res.json({ rooms, users, messages });
};

module.exports = { getChatState };
