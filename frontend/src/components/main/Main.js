import Rooms from "../rooms/Rooms";
import Messenger from "../messenger/Messenger";
import Users from "../users/Users";
import { setUser } from "../../features/user/userSlice";
import { setRooms } from "../../features/rooms/roomsSlice";
import { setMessages } from "../../features/messages/messagesSlice";
import { setUsers } from "../../features/users/usersSlice";
import { useDispatch } from "react-redux";
import { useContext, useEffect } from "react";
import { WebSocketContext } from "../socket/WebSocketProvider";
import {
  fetchUser,
  fetchUsers,
  fetchMessages,
  fetchRooms,
  fetchCafeInfo,
} from "../../api";
import "./main.css";

const Main = () => {
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);

  // get rooms

  // get messages for current room.

  // get users for current room.

  async function determineRoom() {
    const storedRoom = false;
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
    console.log('userId', user.id);
    console.log('username', user.name);
    console.log('userImage', user.image);
    console.log('roomId', room.id);
    ws.userConnecting(user.id, user.name, user.image, room.id);
    const rooms = await fetchRooms();
    dispatch(setRooms(rooms));
    const messages = await fetchMessages(room.id);
    dispatch(setMessages(messages));
    const users = await fetchUsers(room.id);
    dispatch(setUsers(users));
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
