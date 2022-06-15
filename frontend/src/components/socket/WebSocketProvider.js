import React, { createContext } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addMessage, setMessages } from "../../features/messages/messagesSlice";

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io("ws://localhost:9000");

  socket.on("connect", async () => {
    console.log("socket connected. socket id: ", socket.id);
  });

  socket.on("broadcast message", (messageObj) => {
    console.log("broadcasted message", messageObj);
    dispatch(addMessage(messageObj));
  });

  socket.on("joined room", (messagesArr) => {
    dispatch(setMessages(messagesArr));
  });

  socket.on("user joined", (username) => {
    dispatch(
      addMessage({
        type: "userJoined",
        author: username,
      })
    );
  });

  function sendMessage(messageObj) {
    socket.emit("message", messageObj);
  }

  function joinRoom(userName, roomId) {
    console.log("JOIN ROOM CALL", roomId);
    socket.emit("join room", userName, roomId);
  }

  const ws = {
    socket,
    sendMessage,
    joinRoom,
  };

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export { WebSocketProvider, WebSocketContext };
