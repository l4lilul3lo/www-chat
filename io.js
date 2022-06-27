const { getMessagesDB } = require("./models/message");
const { addRoomDB, getRoomsDB } = require("./models/room");

function initIO(server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("initialize server", async (username, roomId) => {
      socket.userInfo = { username, image };
      socket.join(roomId);
      const sockets = await io.in(roomId).fetchSockets();
      const messages = await getMessagesDB();
      socket.emit("initialize client", { messages, sockets });
    });
    socket.on("message", (msg) => {
      const { userId, roomId, content, color, background } = msg;
      console.log("message on message event", msg);
      addMessageDB(userId, roomId, content, color, background);
      io.to(roomId).emit("broadcast message", msg);
    });

    socket.on("getUsersInRoom", async (roomId) => {
      const sockets = await io.fetchSockets();
      console.log("SOCKETS", sockets.length);
      sockets.forEach((socket) => console.log(socket.data));
    });

    socket.on("join room", async (user, roomId) => {
      console.log("roomId in join room", roomId);
      console.log("user in join room", user);

      socket.join(roomId);

      socket.emit("joined room", roomId);
      io.to(roomId).emit("user joined", user.name);
    });

    socket.on("add room", async (roomName, password) => {
      console.log("add room", roomName, password);
      // add room to db, get all rooms from db
      await addRoomDB(roomName, password);

      const rooms = await getRoomsDB();
      console.log("rooms from database call in add room socket", rooms);
      // emit rooms to all sockets
      io.emit("room added", rooms);
    });
  });

  return { io };
}

module.exports = initIO;
// hmmmm
// So, the application should only display users that are in the current room. There will be no "offline users list".

// This can be done by constantly updating the users current room in the database, or it can be done through the websocket (preferably), if socket io lists currently connected socket information.

// when a socket connects, send username and room to server.
// attach username to the socket.
// join socket to room.
/*
const sockets = await io.in("room1").fetchSockets();
get all sockets in that room. 
*/

// send back current users of room.
// if a user is changing rooms, we need to perform an initialization step regardless, so we should perhaps just consolidate this logic into the join room function/event?

// userInformation has to be attached to each socket. This is currently the most convenient way to deal with already having pertinent user data concerning the room without querying the database for every individual user.

// so on socket init, all user information should be attached.
