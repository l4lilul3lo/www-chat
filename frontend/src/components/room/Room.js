import { useContext } from "react";
import { WebSocketContext } from "../socket/WebSocketProvider";
import { useDispatch, useSelector } from "react-redux";
import { setRoom } from "../../features/room/roomSlice";
import { selectUser } from "../../features/user/userSlice";
const Room = ({ room }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const ws = useContext(WebSocketContext);

  function handleRoomClick() {
    ws.joinRoom(user.name, room.id);
    dispatch(setRoom({ name: room.name, id: room.id }));
    localStorage.setItem("room", JSON.stringify(room));
  }

  return (
    <div className="room" onClick={handleRoomClick}>
      {room.name}
    </div>
  );
};

export default Room;
