const { createMessageDB } = require("../models/message");

module.exports = (io, socket) => {
  async function createMessage(messageObj, user) {
    try {
      await createMessageDB(messageObj);
      io.to(messageObj.roomId).emit("message:created", messageObj, user);
    } catch (err) {
      console.log(err);
    }
  }

  socket.on("message:create", createMessage);
};
