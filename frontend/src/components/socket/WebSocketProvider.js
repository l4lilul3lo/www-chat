import React, { createContext } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  addMessage,
  setMessages,
  setMessagesIsLoading,
} from "../../features/messages/messagesSlice";
import { setUsers, addUser, removeUser } from "../../features/users/usersSlice";
import { setPendingRoomId, setRoom } from "../../features/room/roomSlice";
import {
  addRoom,
  setRoomsIsLoading,
  setRooms,
} from "../../features/rooms/roomsSlice";
import { toggleRoomPasswordForm } from "../../features/toggles/togglesSlice";
import { useEffect } from "react";
import { addNotification } from "../../features/notifications/notificationsSlice";
import { setSocketMessage } from "../../features/socket_messages/socketMessageSlice";
import { toggleCreateRoom } from "../../features/toggles/createRoomToggleSlice";
import { setSocketId } from "../../features/socketIdSlice";
import { current } from "@reduxjs/toolkit";

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const host = window.location.host;
  const destination = host === "localhost:3000" ? "localhost:9000" : host;

  let socket = io(`ws://${destination}`);

  useEffect(() => {
    socket.on("connect", () => {
      dispatch(setSocketId(socket.id));
    });

    socket.on("user:joinSuccess");

    socket.on("rooms:getRoomsResponse", (rooms) => {
      dispatch(setRooms(rooms));
      dispatch(setRoomsIsLoading(false));
    });

    socket.on("room:roomExists", (info) => {
      dispatch(setSocketMessage(info.reason));
    });

    socket.on("user:passwordSuccess", () => {
      dispatch(toggleRoomPasswordForm());
    });

    socket.on("user:joinRoomSuccess", (users, messages, room) => {
      dispatch(setRoom(room));
      dispatch(setUsers(users));
      dispatch(setMessages(messages));
      dispatch(setMessagesIsLoading(false));
      localStorage.setItem("storedRoomId", JSON.stringify(room.id));
    });

    socket.on("user:joinRoomFailure", (info) => {
      dispatch(setSocketMessage(info.reason));
    });

    socket.on("user:passwordPrompt", () => {
      dispatch(toggleRoomPasswordForm());
    });

    socket.on("message:created", (messageObj, user) => {
      dispatch(addMessage({ ...messageObj, user }));
    });

    socket.on("allUsers:joinNotification", (user) => {
      dispatch(addNotification(`***${user.name} joined***`));
      dispatch(addUser(user));
    });

    socket.on("allUsers:leaveNotification", (user) => {
      dispatch(addNotification(`***${user.name} left***`));
      dispatch(removeUser(user));
    });

    socket.on("allUsers:roomCreated", (room) => {
      dispatch(addRoom(room));
    });

    socket.on("room:created", (room) => {
      dispatch(toggleCreateRoom());
      ws.joinRoom(room.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("socket disconnected:", reason);
    });
  }, []);

  function sendMessage(messageObj, user) {
    socket.emit("message:create", messageObj, user);
  }

  function getRooms() {
    socket.emit("rooms:getRooms");
    dispatch(setRoomsIsLoading(true));
  }

  function joinRoom(pendingRoomId, currentRoomId, password) {
    dispatch(setPendingRoomId(pendingRoomId));
    socket.emit("user:joinRoom", pendingRoomId, currentRoomId, password);
    dispatch(setMessagesIsLoading(true));
  }

  function userConnecting(user) {
    socket.emit("user:connecting", user);
  }

  function createRoom(roomName, password) {
    socket.emit("room:create", roomName, password);
  }

  function leaveRoom(roomId) {
    socket.emit("user:leaveRoom", roomId);
  }

  const ws = {
    socket,
    sendMessage,
    joinRoom,
    createRoom,
    getRooms,
    userConnecting,
    leaveRoom,
  };

  return (
    <WebSocketContext.Provider className="yuh" value={ws}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketProvider, WebSocketContext };
