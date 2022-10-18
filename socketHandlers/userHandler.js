const bcrypt = require("bcrypt");
const {
  arrUniqueByObjectValue,
  arrCheckObjectValueExists,
} = require("../utils/general");

const {
  getRoomUserDB,
  createRoomUserDB,
  updateRoomUserPrivilege,
} = require("../models/roomsUsers");

const { getMessagesDB } = require("../models/message");
const { getRoomByIdDB, getCafeInfoDB } = require("../models/room");

async function scanRoom(io, userId, roomId) {
  const sockets = await io.in(roomId).fetchSockets();
  const users = sockets.map((socket) => socket.user);
  const uniqueUsers = arrUniqueByObjectValue(users, "id");
  const userExists = arrCheckObjectValueExists(users, "id", userId);
  return { uniqueUsers, userExists };
}

module.exports = (io, socket) => {
  async function joinRoom(pendingRoomId, currentRoomId, password) {
    if (!socket.user) {
      console.log("No user attached to socket. Refresh page.");
      return;
    }

    const room = pendingRoomId
      ? await getRoomByIdDB(pendingRoomId)
      : await getCafeInfoDB();
    const roomId = room.id;
    const userId = socket.user.id;

    let roomUser = await getRoomUserDB(roomId, userId);

    if (!roomUser) {
      roomUser = await createRoomUserDB(roomId, userId);
    }

    if (roomUser.isBanned) {
      return socket.emit("user:joinRoomFailure", { reason: "You were banned" });
    }

    socket.user.privilege = roomUser.privilege;

    if (room.passwordProtected) {
      if (socket.user.privilege === 0) {
        if (!password) {
          return socket.emit("user:passwordPrompt");
        } else {
          const isCorrectPassword = await bcrypt.compare(
            password,
            room.password
          );
          if (!isCorrectPassword) {
            return socket.emit("user:joinRoomFailure", {
              reason: "Password is incorrect",
            });
          } else {
            updateRoomUserPrivilege(roomId, userId, 1);
            socket.emit("user:passwordSuccess");
          }
        }
      }
    }

    const roomMessages = await getMessagesDB(roomId);
    const { uniqueUsers, userExists } = await scanRoom(io, userId, roomId);
    const publicRoomInfo = {
      id: room.id,
      name: room.name,
      passwordProtected: room.passwordProtected,
    };

    socket.emit(
      "user:joinRoomSuccess",
      uniqueUsers,
      roomMessages,
      publicRoomInfo
    );

    socket.join(roomId);
    socket.room = publicRoomInfo;
    if (currentRoomId) {
      leaveRoom(currentRoomId);
    }
    if (!userExists) {
      io.to(room.id).emit("allUsers:joinNotification", socket.user);
    }
  }

  async function leaveRoom(roomId) {
    socket.leave(roomId);
    const { userExists } = await scanRoom(io, socket.user.id, roomId);
    if (!userExists) {
      io.to(roomId).emit("allUsers:leaveNotification", socket.user);
    }
  }

  function userConnecting(user) {
    socket.user = user;
  }

  socket.on("user:connecting", userConnecting);
  socket.on("user:joinRoom", joinRoom);
  socket.on("user:leaveRoom", leaveRoom);
  socket.on("disconnect", () => {
    console.log(socket.user);
    console.log(socket.room);
    console.log("socket disconnected");
    leaveRoom(socket.room.id);
  });
};

// when an admin joins the room, users should be returned with actions.
// then and only then will those actions be available on the front end.
//
