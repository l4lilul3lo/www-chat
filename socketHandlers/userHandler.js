const {
  arrUniqueByObjectValue,
  arrCheckObjectValueExists,
} = require("../utils/general");

const { getRoomUserInfoDB, createRoomUserDB } = require("../models/roomsUsers");

const { getMessagesDB } = require("../models/message");

async function scanRoom(io, userId, roomId) {
  const sockets = await io.in(roomId).fetchSockets();
  const users = sockets.map((socket) => socket.user);
  const uniqueUsers = arrUniqueByObjectValue(users, "id");
  const isUserDuplicate = arrCheckObjectValueExists(users, "id", userId);
  return { uniqueUsers, isUserDuplicate };
}

module.exports = (io, socket) => {
  async function joinRoom(room) {
    const userId = socket.user.id;
    const roomId = room.id;
    const roomUserInfo = await getRoomUserInfoDB(userId, roomId);

    if (!roomUserInfo) {
      await createRoomUserDB(userId, roomId);
    }

    if (roomUserInfo) {
      if (roomUserInfo.isBlocked) {
        socket.emit("user:joinFailure", { reason: "You were banned" });
        return;
      }
    }

    const roomMessages = await getMessagesDB(roomId);

    const { uniqueUsers, isUserDuplicate } = await scanRoom(io, userId, roomId);
    socket.emit("user:joinRoomResponse", uniqueUsers, roomMessages, room);
    socket.join(roomId);

    if (!isUserDuplicate) {
      io.to(room.id).emit("allUsers:joinNotification", socket.user);
    }
  }

  function leaveRoom(roomId) {
    socket.leave(roomId);
  }

  function userConnecting(user) {
    socket.user = user;
  }

  socket.on("user:connecting", userConnecting);
  socket.on("user:joinRoom", joinRoom);
  socket.on("user:leaveRoom", leaveRoom);
};
