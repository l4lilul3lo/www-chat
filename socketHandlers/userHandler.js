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
  async function joinRoom(user, room) {
    const roomUserInfo = await getRoomUserInfoDB(user.id, room.id);

    if (!roomUserInfo) {
      await createRoomUserDB(user.id, room.id);
    }

    console.log("roomUserInfo", roomUserInfo);
    console.log("socket user", socket.user);

    if (roomUserInfo.isBlocked) {
      socket.emit("user:joinFailure", { reason: "You were banned" });
      return;
    }

    const roomMessages = await getMessagesDB(room.id);
    const { uniqueUsers, isUserDuplicate } = await scanRoom(
      io,
      user.id,
      room.id
    );
    // const sockets = await io.in(room.id).fetchSockets();
    // const users = sockets.map((socket) => socket.user);
    // const uniqueUsers = arrUniqueByObjectValue(users, "id");
    // const isUserDuplicate = arrCheckObjectValueExists(users, "id", user.id);
    socket.join(room.id);
    socket.emit("user:joinedRoom", uniqueUsers, roomMessages, room);

    if (!isUserDuplicate) {
      io.to(room.id).emit("allUsers:joinNotification", user);
    }
  }

  // okay so we need to create rooms_users entry when a user joins a room. This means every time a user joins, we're talking to the database. Does it really matter at this point?

  // should we worry about it later?

  // the rooms_users entry should tell us information about the users priveledge in a room.

  // what if room data is attached to socket users. And when a user makes a call to

  function leaveRoom(roomId) {
    socket.leave(roomId);
  }

  function userConnecting(user, room) {
    socket.user = user; // take user id and get pertinent user data. We want to do this at the start so that we can see if a user has joined a room before. Or simply, when a user clicks on a room, make an http request first.
    joinRoom(user, room);
  }

  socket.on("user:connecting", userConnecting);
  socket.on("user:joinRoom", joinRoom);
  socket.on("user:leaveRoom", leaveRoom);
};
