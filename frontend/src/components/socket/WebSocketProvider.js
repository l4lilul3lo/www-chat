import React, { createContext } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addMessage, setMessages } from "../../features/messages/messagesSlice";
import { setUsers } from "../../features/users/usersSlice";
import { setRoom } from "../../features/room/roomSlice";
import { useRef, useEffect } from "react";
const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  let socket = io("ws://localhost:9000");

  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  {
    console.log("websocket renders", renderCounter.current);
  }

  useEffect(() => {
    socket.on("connect", async () => {});

    socket.on("user connected", (users) => {
      dispatch(setUsers(users));
    });

    socket.on("message:created", (messageObj, user) => {
      console.log("message obj in message:created", messageObj);
      dispatch(addMessage({ ...messageObj, user }));
    });

    socket.on("joined room", (roomId) => {
      localStorage.setItem("room", roomId);
    });

    socket.on("room added", (rooms) => {});

    socket.on("user:joinedRoom", (users, room) => {
      console.log("USERs IN SOCKET", users);
      console.log("ROOM IN SOCKET", room);
      dispatch(setUsers(users));
      dispatch(setRoom(room));
    });

    socket.on("disconnect", (reason) => {
      console.log("socket disconnected:", reason);
    });

    socket.on("user:userJoined", (username) => {
      console.log("user name in user:userJoined");
      dispatch(addMessage({ username }));
    });

    socket.on("getUsersInRoom response", (users) => {
      dispatch(setUsers(users));
    });
  }, []);

  function sendMessage(messageObj, user) {
    socket.emit("message:create", messageObj, user);
  }

  function joinRoom(user, room) {
    socket.emit("user:joinRoom", user, room);
  }

  function getUsersInRoom(roomId) {
    socket.emit("getUsersInRoom", roomId);
  }

  function userConnecting(user, room) {
    socket.emit("user:connecting", user, room);
  }

  function watsupServerInstance(userId, username, roomId) {
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
    userConnecting,
  };

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export { WebSocketProvider, WebSocketContext };
