const { createRoomDB } = require("../models/room");
module.exports = (io, socket) => {
  async function createRoom(roomObj) {
    const room = await createRoomDB(roomObj);
    io.emit("room:created", room);
  }

  socket.on("room:create", createRoom);
};
