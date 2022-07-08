import { useContext } from "react";
import { WebSocketContext } from "../socket/WebSocketProvider";
import { useDispatch, useSelector } from "react-redux";
import { selectRoom } from "../../features/room/roomSlice";
import { selectUser } from "../../features/user/userSlice";
import { fetchMessages } from "../../api";
import { setMessages } from "../../features/messages/messagesSlice";

import "./room.css";
const Room = ({ room }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentRoom = useSelector(selectRoom);
  const ws = useContext(WebSocketContext);

  async function handleRoomClick() {
    console.log(currentRoom.id);
    console.log(room.id);
    if (currentRoom.id !== room.id) {
      // await fetchIsBanned
      // if (isBanned)
      // notify and do nothing

      const messages = await fetchMessages(room.id);
      dispatch(setMessages(messages));
      ws.leaveRoom(currentRoom.id);
      ws.joinRoom(user, room);
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
