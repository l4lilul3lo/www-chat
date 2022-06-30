module.exports = (io, socket) => {
  async function joinRoom(user, room) {
    console.log("ROOM IN JOIN ROOM", room);
    socket.join(room.id);
    const sockets = await io.in(room.id).fetchSockets();
    console.log("SOCKETS WHEN USER JOINS ROOM", sockets.length);
    const users = sockets.map((socket) => socket.user);
    console.log("USERS IN CURRENT ROOM", users);
    socket.emit("user:joinedRoom", users, room);

    io.to(room.id).emit("user:userJoined", user.name);
  }

  function userConnecting(user, room) {
    socket.user = user;
    setTimeout(() => {
      joinRoom(user, room);
    }, 500);
  }

  socket.on("user:connecting", userConnecting);
  socket.on("user:joinRoom", joinRoom);
};
