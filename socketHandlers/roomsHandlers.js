const { createRoomDB, getRoomsDB } = require("../models/room");
const bcrypt = require("bcrypt");
const { createRoomUserDB } = require("../models/roomsUsers");
module.exports = (io, socket) => {
  async function createRoom(roomName, password) {
    console.log("roomName", roomName);
    console.log("password", password);
    if (!socket.user) {
      return;
    }
    let room;
    if (!password) {
      room = await createRoomDB({ name: roomName });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      room = await createRoomDB({ name: roomName, password: hashedPassword });
    }
    console.log(room);
    // create rooms_users entry with new room data and the user who created it, with priveledge set to 2.
    io.emit("room:created", room);
  }

  async function getRooms() {
    const rooms = await getRoomsDB();
    socket.emit("rooms:getRoomsResponse", rooms);
  }

  socket.on("room:create", createRoom);
  socket.on("rooms:getRooms", getRooms);
};
