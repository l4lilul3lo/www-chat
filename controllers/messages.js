const { getMessagesDB } = require("../models/messages/messages");
const getMessages = async (req, res) => {
  const messages = await getMessagesDB();
  res.json({ messages });
};

module.exports = { getMessages };
