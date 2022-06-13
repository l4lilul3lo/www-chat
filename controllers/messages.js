const { getMessagesDB, addMessageDB } = require("../models/messages/messages");
const { getRoomIdDB } = require("../models/rooms/rooms");

const getMessages = async (req, res) => {
  const { roomId } = req.body;

  const messages = await getMessagesDB(roomId);

  res.json({ messages });
};

const addMessage = async (req, res) => {
  const { userId, roomId, content, color, background } = req.body;

  await addMessageDB(userId, roomId, content, color, background);
  res.send("message sent");
};

module.exports = { getMessages, addMessage };
