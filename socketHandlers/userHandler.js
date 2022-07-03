const {
  arrUniqueByObjectValue,
  arrCheckObjectValueExists,
} = require("../utils/general");

module.exports = (io, socket) => {
  async function joinRoom(user, room) {
    const sockets = await io.in(room.id).fetchSockets();
    const users = sockets.map((socket) => socket.user);
    const uniqueUsers = arrUniqueByObjectValue(users, "id");
    const userDuplicate = arrCheckObjectValueExists(users, "id", user.id);
    socket.emit("user:joinedRoom", uniqueUsers, room);
    socket.join(room.id);
    if (!userDuplicate) {
      io.to(room.id).emit("user:userJoined", user);
    }
  }

  function leaveRoom(roomId) {
    socket.leave(roomId);
  }

  function userConnecting(user, room) {
    socket.user = user;
    joinRoom(user, room);
  }

  socket.on("user:connecting", userConnecting);
  socket.on("user:joinRoom", joinRoom);
  socket.on("user:leaveRoom", leaveRoom);
};
