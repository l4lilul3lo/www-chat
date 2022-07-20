import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { WebSocketContext } from "../socket/WebSocketProvider";
import Rooms from "../rooms/Rooms";
import Messenger from "../messenger/Messenger";
import Users from "../users/Users";
import { setUser } from "../../features/user/userSlice";
import { fetchUser, fetchCafeInfo } from "../../api";
import "./main.css";

const Main = () => {
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);

  async function determineRoom() {
    const storedRoom = JSON.parse(localStorage.getItem("storedRoom"));

    if (!storedRoom) {
      const cafeInfo = await fetchCafeInfo();
      return cafeInfo;
    }
    return storedRoom;
  }

  async function initialize() {
    const user = await fetchUser();
    dispatch(setUser(user));
    const room = await determineRoom();
    ws.userConnecting(user);
    ws.getRooms();
    ws.joinRoom(room);
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <main>
      <Rooms />
      <Messenger />
      <Users />
    </main>
  );
};

export default Main;
