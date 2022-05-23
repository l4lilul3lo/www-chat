import { io } from "socket.io-client";
import useUser from "../hooks/useUser";
const socket = io("ws://localhost:9000");

socket.on("connect", async () => {
  const user = useUser();
  socket.currentRoom = user.currentRoom;
  const users = await fetch("/getUsers");
  const rooms = await fetch("/getRooms");
  const messages = await fetch("/getMessages");
  console.log("users", users);
  console.log("rooms", rooms);
  console.log("messages", messages);
});

function sendMessage(username, content, style) {
  const message = { username, content, style };
  socket.emit("message", message);
}

export { socket, sendMessage };
