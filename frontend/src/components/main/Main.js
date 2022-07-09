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

    if (!storedRoom) {
      const cafeInfo = await fetchCafeInfo();
      return cafeInfo;
    }
    return storedRoom;
  }

  async function initialize() {
    const user = await fetchUser();
    console.log("user", user);
    dispatch(setUser(user));
    const room = await determineRoom();
    ws.userConnecting(user);
    ws.getRooms();
    ws.joinRoom(room);
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
