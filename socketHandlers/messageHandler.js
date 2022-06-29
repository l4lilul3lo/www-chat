module.exports = (io, socket) => {
  async function createMessage(messageObj) {
    await createMessageDB(messageObj);
    io.to(messageObj.room_id).emit("message created", messageObj);
  }

  socket.on("message:create", createMessage);
};
