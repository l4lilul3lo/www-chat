import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import Rooms from "../rooms/Rooms";
import Messenger from "../messenger/Messenger";
import Users from "../users/Users";
import { setRooms, setRoomsIsLoading } from "../../features/rooms/roomsSlice";
import { setUser } from "../../features/user/userSlice";
import { setMessages } from "../../features/messages/messagesSlice";
import {
  fetchUser,
  fetchMessages,
  fetchRooms,
  fetchCafeInfo,
  fetchIsBlocked,
} from "../../api";
import { WebSocketContext } from "../socket/WebSocketProvider";
import "./main.css";

const Main = () => {
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);

  async function determineRoom() {
    const storedRoom = JSON.parse(localStorage.getItem("storedRoom"));
    const cafeInfo = await fetchCafeInfo();
    if (!storedRoom) {
      return cafeInfo;
    }
    const isBlocked = await fetchIsBlocked(storedRoom.id);
    console.log(isBlocked);
    if (isBlocked) {
      return cafeInfo;
    }
    return storedRoom;
  }

  async function initialize() {
    const rooms = await fetchRooms();
    dispatch(setRooms(rooms));
    dispatch(setRoomsIsLoading(false));
    const user = await fetchUser();
    dispatch(setUser(user));
    const room = await determineRoom();
    // const messages = await fetchMessages(room.id);
    // dispatch(setMessages(messages));
    ws.userConnecting(
      { id: user.id, name: user.name, image: user.image },
      room
    );
  }

  // the problem right now is syncing user joined after messages. We dont' want to send messages over the wire to a user who should not join.

  // steps:
  // A user should attempt to join a room.
  // if it fails, a blocked message should be sent back to the user.

  // if it succeeds
  // socket.on(user:joinSuccess, handleJoinSuccess) //

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
