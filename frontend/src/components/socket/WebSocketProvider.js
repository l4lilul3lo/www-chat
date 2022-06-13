import React, { createContext } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addMessage } from "../../features/messages/messagesSlice";

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io("ws://localhost:9000");

  socket.on("connect", () => {
    console.log("socket connected. socket id: ", socket.id);
  });

  socket.on("broadcast message", (message) => {
    dispatch(addMessage(message));
  });

  function sendMessage(messageObj) {
    socket.emit("message", messageObj);
  }

  const ws = {
    socket: socket,
    sendMessage,
  };

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export { WebSocketProvider, WebSocketContext };
