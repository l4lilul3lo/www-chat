const { createRoomDB, getRoomsDB, getRoomByNameDB } = require("../models/room");
const bcrypt = require("bcrypt");
const { createRoomUserDB } = require("../models/roomsUsers");
module.exports = (io, socket) => {
  async function createRoom(roomName, password) {
    if (!socket.user) {
      return;
    }

    if (roomName.length < 2 || roomName.length > 32) {
      console.log("room length is wrong");
      return;
    }

    const roomExists = await getRoomByNameDB(roomName);
    if (roomExists) {
      socket.emit("room:roomExists", { reason: "Room name already taken" });
      return;
    }
    let room;
    if (!password) {
      room = await createRoomDB({ name: roomName });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      room = await createRoomDB({ name: roomName, password: hashedPassword });
    }

    createRoomUserDB(room.id, socket.user.id, 2);
    io.emit("allUsers:roomCreated", room);
    socket.emit("room:created", room);
  }

  async function getRooms() {
    const rooms = await getRoomsDB();
    socket.emit("rooms:getRoomsResponse", rooms);
  }

  socket.on("room:create", createRoom);
  socket.on("rooms:getRooms", getRooms);
};
