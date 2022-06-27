const { addMessageDB, getMessagesDB } = require("../models/message");

async function addMessage(req, res) {
  const { messageObj } = req.body;
  await addMessage(messageObj);
  res.send("message succesfully sent");
}

async function getMessages(req, res) {
  const { roomId } = req.body;
  const messages = await getMessagesDB(roomId);

  res.json({ messages });
}

module.exports = { addMessage, getMessages };
