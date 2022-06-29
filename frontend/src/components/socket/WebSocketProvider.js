import React, { createContext } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addMessage, setMessages } from "../../features/messages/messagesSlice";
import { setUsers } from "../../features/users/usersSlice";

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children, userId, username, roomId }) => {
  const dispatch = useDispatch();
  const socket = io("ws://localhost:9000");

  socket.on("connect", async () => {});

  socket.on("user connected", (users) => {
    dispatch(setUsers(users))
  })

  socket.on("broadcast message", (messageObj) => {
    dispatch(addMessage(messageObj));
  });

  socket.on("joined room", (roomId) => {
    localStorage.setItem("room", roomId);
  });

  socket.on("room added", (rooms) => {});

  socket.on("user joined", (username) => {
    dispatch(
      addMessage({
        type: "userJoined",
        user: {
          name: username,
        },
      })
    );
  });

  socket.on("getUsersInRoom response", (users) => {
    dispatch(setUsers(users));
  });

  function sendMessage(messageObj) {
    socket.emit("message", messageObj);
  }

  function joinRoom(user, roomId) {
    socket.emit("join room", user, roomId);
  }

  function getUsersInRoom(roomId) {
    socket.emit("getUsersInRoom", roomId);
  }

  function userConnecting(userId, username, userImage, roomId) {
    socket.emit("user connecting", userId, username, userImage, roomId);
  }

  function watsupServerInstance(userId, username, roomId) {
    // get roomId from localStorage if it exists.
    // then userId and username should not change. No need to worry about re-render.
    socket.emit("watsup server", userId, username, roomId);
  }

  function addRoom(roomName, password) {
    socket.emit("add room", roomName, password);
  }

  const ws = {
    socket,
    sendMessage,
    joinRoom,
    watsupServerInstance,
    addRoom,
    getUsersInRoom,
    userConnecting
  };

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export { WebSocketProvider, WebSocketContext };
