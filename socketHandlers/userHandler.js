module.exports = (io, socket) => {

  function joinRoom(user, roomId) {
    const sockets = await io.in(roomId).fetchSockets();
    const users = sockets.map((socket) => socket.userInfo);
    socket.emit("joined room", users);
    socket.join(roomId);
    io.to(roomId).emit("user joined", user);
  }
  
  function userConnecting(user, roomId) {
    socket.user = user;
    joinRoom(user, roomId);
  };

  socket.on("user:connecting", userConnecting);
  socket.on("user:joinRoom", joinRoom);
};
