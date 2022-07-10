import { useContext } from "react";
import { WebSocketContext } from "../socket/WebSocketProvider";
import { useDispatch, useSelector } from "react-redux";
import { selectRoom } from "../../features/room/roomSlice";
import { selectUser } from "../../features/user/userSlice";
import { fetchMessages } from "../../api";
import { fetchIsBlocked } from "../../api";
import { setMessages } from "../../features/messages/messagesSlice";
import { toggleRoomsSlideState } from "../../features/toggles/roomsSlideSlice";

import "./room.css";
const Room = ({ room }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentRoom = useSelector(selectRoom);
  const ws = useContext(WebSocketContext);

  async function handleRoomClick() {
    if (window.innerWidth <= 850) {
      dispatch(toggleRoomsSlideState());
    }
    console.log(currentRoom.id);
    console.log(room.id);
    if (currentRoom.id !== room.id) {
      const isBlocked = await fetchIsBlocked(room.id);
      console.log("isBlocked", isBlocked);
      if (isBlocked) {
      }

      const messages = await fetchMessages(room.id);
      dispatch(setMessages(messages));
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
