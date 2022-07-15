const bcrypt = require("bcrypt");
const {
  arrUniqueByObjectValue,
  arrCheckObjectValueExists,
} = require("../utils/general");

const { getRoomUserInfoDB, createRoomUserDB } = require("../models/roomsUsers");

const { getMessagesDB } = require("../models/message");
const { getRoomByIdDB, getCafeInfoDB } = require("../models/room");

async function scanRoom(io, userId, roomId) {
  const sockets = await io.in(roomId).fetchSockets();
  const users = sockets.map((socket) => socket.user);
  const uniqueUsers = arrUniqueByObjectValue(users, "id");
  const isUserDuplicate = arrCheckObjectValueExists(users, "id", userId);
  return { uniqueUsers, isUserDuplicate };
}

async function determineRoomInfo(roomId) {
  let roomInfo = await getRoomByIdDB(roomId);
  if (!roomInfo) {
    roomInfo = await getCafeInfoDB();
  }
  return roomInfo;
}

async function determineAuthStatus(roomInfo, password) {
  if (!password) {
    return "undetermined";
  }
  const isCorrectPassword = await bcrypt.compare(password, roomInfo.password);
  console.log(isCorrectPassword);
  return isCorrectPassword ? "authorized" : "unauthorized";
}
module.exports = (io, socket) => {
  async function joinRoom(room, password) {
    // edgey
    console.log("room", room);
    console.log("password", password);
    console.log(socket.user);
    if (!socket.user) {
      console.log("No user attached to socket. Refresh page.");
      // socket emit request user. retry 0.
      return;
    }

    if (!room || !room.id) {
      console.log("Room object is malformed");
      return;
    }

    const userId = socket.user.id;
    const roomInfo = await determineRoomInfo(room.id);
    const roomId = roomInfo.id;
    const roomUserInfo = await getRoomUserInfoDB(userId, roomId);
    const passwordProtected = roomInfo.passwordProtected;
    const userIsAdmin = roomUserInfo?.privilege === 2;
    socket.user.isAdmin = userIsAdmin ? true : false;
    console.log(socket.user);
    console.log("passwordProtected", passwordProtected);
    console.log(roomUserInfo);
    console.log("userIsAdmin", userIsAdmin);
    if (!userIsAdmin && passwordProtected) {
      console.log("ACTIVATED");
      const authStatus = await determineAuthStatus(roomInfo, password);
      if (authStatus === "undetermined") {
        socket.emit("user:passwordPrompt");
        return;
      }

      if (authStatus === "unauthorized") {
        socket.emit("user:joinRoomFailure", {
          reason: "Password is incorrect.",
        });
        return;
      }

      if (authStatus === "authorized") {
        socket.emit("user:passwordSuccess");
      }
    }

    if (!roomUserInfo) {
      await createRoomUserDB(userId, roomId);
    }
    console.log("this far");

    if (roomUserInfo?.isBanned) {
      socket.emit("user:joinRoomFailure", { reason: "You were banned." });
      return;
    }

    const roomMessages = await getMessagesDB(roomId);

    const { uniqueUsers, isUserDuplicate } = await scanRoom(io, userId, roomId);
    socket.emit("user:joinRoomSuccess", uniqueUsers, roomMessages, room);
    socket.join(roomId);
    console.log("that far");

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
