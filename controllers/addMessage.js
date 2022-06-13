const { addMessageDB } = require("../models/messages/messages");

const addMessage = async (req, res) => {
  res.send("hello");
};

module.exports = { addMessage };
