import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import Rooms from "../rooms/Rooms";
import Messenger from "../messenger/Messenger";
import Users from "../users/Users";
import { setRooms } from "../../features/rooms/roomsSlice";
import { setUser } from "../../features/user/userSlice";
import { setMessages } from "../../features/messages/messagesSlice";
import { fetchUser, fetchMessages, fetchRooms, fetchCafeInfo } from "../../api";
import { WebSocketContext } from "../socket/WebSocketProvider";
import "./main.css";

const Main = () => {
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);

  async function determineRoom() {
    const storedRoom = false;
    if (!storedRoom) {
      const cafeInfo = await fetchCafeInfo();
      return cafeInfo;
    }
    return storedRoom;
  }

  async function initialize() {
    const rooms = await fetchRooms();
    dispatch(setRooms(rooms));
    const user = await fetchUser();
    dispatch(setUser(user));
    const room = await determineRoom();
    const messages = await fetchMessages(room.id);
    dispatch(setMessages(messages));
    ws.userConnecting(
      { id: user.id, name: user.name, image: user.image },
      room
    );
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
