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
    console.log("room in ");
    console.log("userId on join room", userId);
    const roomId = room.id;
    const roomUserInfo = await getRoomUserInfoDB(userId, roomId);

    if (!roomUserInfo) {
      await createRoomUserDB(userId, roomId);
    }

    console.log("roomUserInfo", roomUserInfo);
    console.log("socket user in join room", socket.user);

    if (roomUserInfo.isBlocked) {
      socket.emit("user:joinFailure", { reason: "You were banned" });
      return;
    }

    const roomMessages = await getMessagesDB(roomId);
    const { uniqueUsers, isUserDuplicate } = await scanRoom(io, userId, roomId);
    // const sockets = await io.in(room.id).fetchSockets();
    // const users = sockets.map((socket) => socket.user);
    // const uniqueUsers = arrUniqueByObjectValue(users, "id");
    // const isUserDuplicate = arrCheckObjectValueExists(users, "id", user.id);
    socket.join(roomId);
    socket.emit("user:joinRoomResponse", uniqueUsers, roomMessages, room);

    if (!isUserDuplicate) {
      io.to(room.id).emit("allUsers:joinNotification", socket.user.name);
    }
  }

  // okay so we need to create rooms_users entry when a user joins a room. This means every time a user joins, we're talking to the database. Does it really matter at this point?

  // should we worry about it later?

  // the rooms_users entry should tell us information about the users priveledge in a room.

  // what if room data is attached to socket users. And when a user makes a call to

  function leaveRoom(roomId) {
    socket.leave(roomId);
  }

  function userConnecting(user) {
    console.log("user", user);
    socket.user = user;
    console.log("socket user", socket.user);
  }

  socket.on("user:connecting", userConnecting);
  socket.on("user:joinRoom", joinRoom);
  socket.on("user:leaveRoom", leaveRoom);
};
