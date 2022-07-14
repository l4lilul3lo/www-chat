const { createMessageDB } = require("../models/message");

module.exports = (io, socket) => {
  async function createMessage(messageObj, user) {
    try {
      await createMessageDB(messageObj);
      const date = Date.now();

      io.to(messageObj.roomId).emit(
        "message:created",
        { ...messageObj, createdAt: date },
        user
      );
    } catch (err) {
      console.log(err);
    }
  }

  socket.on("message:create", createMessage);
};
