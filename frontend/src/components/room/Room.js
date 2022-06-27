import { useContext } from "react";
import { WebSocketContext } from "../socket/WebSocketProvider";
import { useDispatch, useSelector } from "react-redux";
import { setRoom, selectRoom } from "../../features/room/roomSlice";
import { selectUser } from "../../features/user/userSlice";
import { getMessages } from "../../api";
import { setMessages } from "../../features/messages/messagesSlice";
const Room = ({ room }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const ws = useContext(WebSocketContext);

  async function handleRoomClick() {
    ws.joinRoom(user.id, user.name, room.id);
    ws.getUsersInRoom(room.id);
    dispatch(setRoom({ name: room.name, id: room.id }));
    localStorage.setItem("room", JSON.stringify(room));

    const messages = await getMessages(room.id);

    dispatch(setMessages(messages));
  }

  return (
    <div className="room" onClick={handleRoomClick}>
      {room.name}
    </div>
  );
};

export default Room;
