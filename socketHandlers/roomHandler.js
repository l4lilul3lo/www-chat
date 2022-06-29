module.exports = (io, socket) => {
  async function createRoom(roomObj) {
    await createRoomDB(roomObj);
    io.emit("room:created", roomObj);
  }

  socket.on("room:create", createRoom);
};
