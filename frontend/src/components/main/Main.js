import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WebSocketContext } from "../socket/WebSocketProvider";
import Rooms from "../rooms/Rooms";
import Messenger from "../messenger/Messenger";
import Users from "../users/Users";
import { setUser } from "../../features/user/userSlice";
import { fetchUser, fetchCafeInfo } from "../../api";
import { selectSocketId } from "../../features/socketIdSlice";
import "./main.css";

const Main = () => {
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);
  const socketId = useSelector(selectSocketId);
  async function initialize() {
    const user = await fetchUser();
    dispatch(setUser(user));
    const storedRoomId = JSON.parse(localStorage.getItem("storedRoomId"));
    ws.userConnecting(user);
    ws.getRooms();
    ws.joinRoom(storedRoomId);
  }

  useEffect(() => {
    if (socketId) {
      initialize();
    }
  }, [socketId]);

  return (
    <main>
      <Rooms />
      <Messenger />
      <Users />
    </main>
  );
};

export default Main;
