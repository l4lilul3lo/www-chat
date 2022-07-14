import React, { createContext } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  addMessage,
  setMessages,
  setMessagesIsLoading,
} from "../../features/messages/messagesSlice";
import { setUsers, addUser } from "../../features/users/usersSlice";
import { setRoom } from "../../features/room/roomSlice";
import {
  addRoom,
  setRoomsIsLoading,
  setRooms,
} from "../../features/rooms/roomsSlice";
import { useRef, useEffect } from "react";
import { addNotification } from "../../features/notifications/notificationsSlice";

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  let socket = io("ws://localhost:9000");

  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  console.log("websocket renders", renderCounter.current);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected: ", socket.id);
    });

    socket.on("user:joinSuccess");

    socket.on("rooms:getRoomsResponse", (rooms) => {
      dispatch(setRooms(rooms));
      dispatch(setRoomsIsLoading(false));
    });

    socket.on("user:joinRoomResponse", (users, messages, room) => {
      dispatch(setUsers(users));
      dispatch(setMessages(messages));
      dispatch(setMessagesIsLoading(false));
      dispatch(setRoom(room));
    });

    // socket.on("user:userJoined", (user) => {
    //   dispatch(addMessage({ username: user.name }));
    //   dispatch(addUser(user));
    // });

    socket.on("message:created", (messageObj, user) => {
      dispatch(addMessage({ ...messageObj, user }));
    });

    socket.on("allUsers:joinNotification", (user) => {
      dispatch(addNotification(`***${user.name} joined***`));
      dispatch(addUser(user));
    });

    socket.on("room:created", (room) => {
      dispatch(addRoom(room));
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

  function joinRoom(room) {
    socket.emit("user:joinRoom", room);
    dispatch(setMessagesIsLoading(true));
  }

  function userConnecting(user) {
    socket.emit("user:connecting", user);
  }

  function createRoom(room) {
    socket.emit("room:create", room);
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

// when a user joins or leaves, add to sliding text state array.

// then in sliding text component, listen for state changes.

// the animation will run once, and on animation end, p
