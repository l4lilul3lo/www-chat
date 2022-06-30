const { getMessagesDB } = require("../models/message");

async function getMessages(req, res) {
  const { roomId } = req.body;
  console.log("roomId in getMessages", roomId);
  const messages = await getMessagesDB(roomId);

  res.json({ messages });
}

module.exports = { getMessages };
