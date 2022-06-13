import { useSelector, useDispatch } from "react-redux";
import { selectRooms, setRooms } from "../../features/rooms/roomsSlice";
import { selectUser } from "../../features/user/userSlice";
import { setRoom, selectRoom } from "../../features/room/roomSlice";
import { useEffect, useState } from "react";
import { joinRoom, socket } from "../../socket/socket";
import CreateRoom from "../create_room/CreateRoom";
import SocketContext from "../../providers/SocketProvider";
import Room from "../room/Room";
import { useContext } from "react";
import "./rooms.css";
const Rooms = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const rooms = useSelector(selectRooms);
  // we are subscribed to rooms so when socket provider updates rooms, this component will properly re-render. good.
  const [display, toggleDisplay] = useState(false);

  async function getRooms() {
    const response = await fetch("getRooms");
    const data = await response.json();
    console.log("rooms response in rooms component", data.rooms);
    dispatch(setRooms(data.rooms));
  }

  useEffect(() => {
    getRooms();
  }, []);

  async function createRoom(e) {}

  return (
    <div className="rooms-container">
      {display && <CreateRoom />}
      <div className="rooms-header">
        <div>Rooms</div>
        <span className="material-symbols-outlined" onClick={createRoom}>
          add
        </span>
      </div>
      {rooms.map((room, i) => (
        <Room room={room} />
      ))}
    </div>
  );
};

export default Rooms;

// if there is no stored room, cafe details should be fetched.
