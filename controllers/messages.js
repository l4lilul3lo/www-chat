const { getMessagesDB } = require("../models/message");

async function getMessages(req, res) {
  const { roomId } = req.body;
  const messages = await getMessagesDB(roomId);
  messages.reverse();
  res.json({ messages });
}

module.exports = { getMessages };
