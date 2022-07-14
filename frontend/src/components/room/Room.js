import { useContext } from "react";
import { WebSocketContext } from "../socket/WebSocketProvider";
import { useDispatch, useSelector } from "react-redux";
import { selectRoom } from "../../features/room/roomSlice";
import "./room.css";
import { toggleRooms } from "../../features/toggles/togglesSlice";

const Room = ({ room }) => {
  const dispatch = useDispatch();
  const currentRoom = useSelector(selectRoom);
  const ws = useContext(WebSocketContext);

  async function handleRoomClick() {
    if (window.innerWidth <= 850) {
      dispatch(toggleRooms());
    }
    if (currentRoom.id !== room.id) {
      ws.leaveRoom(currentRoom.id);
      ws.joinRoom(room);
      localStorage.setItem("room", JSON.stringify(room));
    }
  }

  return (
    <div
      className={
        currentRoom.id === room.id ? "room-selected" : "room-not-selected"
      }
      onClick={handleRoomClick}
    >
      {room.name}
    </div>
  );
};

export default Room;
