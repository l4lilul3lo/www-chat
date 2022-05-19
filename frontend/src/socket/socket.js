import { io } from "socket.io-client";

const socket = io("ws://localhost:9000");

function sendMessage(username, content, style) {
  const message = { username, content, style };
  socket.emit("message", message);
}

export { socket, sendMessage };
