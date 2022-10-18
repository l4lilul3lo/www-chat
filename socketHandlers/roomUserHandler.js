module.exports = (io, socket) => {
  getUserInfo() {
    // if user getting info is admin of room,
    // then userInfo should be returned with options to kick
    // ban
    
    // when the user is kicked, their privilege should be reset to 0.
    // when the user is banned, privilege is set to 0 and isBanned is set to true.
    
  }
  
  function kickRoomUser() {

  }

  socket.on("roomUser:kick", kickRoomUser);
};