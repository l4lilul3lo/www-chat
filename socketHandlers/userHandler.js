module.exports = (io, socket) => {
  async function joinRoom(user, room) {
    // get all sockets in selected room.
    const sockets = await io.in(room.id).fetchSockets();

    // get all user information attached to sockets in room.
    const users = sockets.map((socket) => socket.user);

    // send all users in current room to calling socket.
    socket.emit("user:joinedRoom", users, room);

    // join the socket to the room.
    socket.join(room.id);

    // send the joining users information to all sockets in the current room, including the joining user.
    io.to(room.id).emit("user:userJoined", user);
  }

  function leaveRoom(roomId) {
    socket.leave(roomId);
  }

  function userConnecting(user, room) {
    // attach user information to socket.
    socket.user = user;
    // join socket to room.
    joinRoom(user, room);
  }

  socket.on("user:connecting", userConnecting);
  socket.on("user:joinRoom", joinRoom);
  socket.on("user:leaveRoom", leaveRoom);
};
