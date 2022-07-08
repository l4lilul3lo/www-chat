const { createRoomDB } = require("../models/room");
module.exports = (io, socket) => {
  async function createRoom(roomObj) {
    const room = await createRoomDB(roomObj);
    // create rooms_users entry with new room data and the user who created it, with priveledge set to 2.
    io.emit("room:created", room);
  }

  socket.on("room:create", createRoom);
};
