const { createRoomDB, getRoomsDB, getRoomByNameDB } = require("../models/room");
const bcrypt = require("bcrypt");
const { createRoomUserDB } = require("../models/roomsUsers");
module.exports = (io, socket) => {
  async function createRoom(roomName, password) {
    console.log("roomName", roomName);
    console.log("password", password);
    if (!socket.user) {
      return;
    }
    const roomExists = await getRoomByNameDB(roomName);
    console.log("roomExists", roomExists);
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
    console.log(room);
    // create rooms_users entry with new room data and the user who created it, with priveledge set to 2.
    createRoomUserDB(socket.user.id, room.id, 2);
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
