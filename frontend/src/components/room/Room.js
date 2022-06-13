import { useContext } from "react";
import { WebSocketContext } from "../socket/WebSocketProvider";
const Room = ({ room }) => {
  const ws = useContext(WebSocketContext);

  function handleRoomClick() {
    console.log(room.id);
  }

  return (
    <div className="room" onClick={handleRoomClick}>
      {room.name}
    </div>
  );
};

export default Room;
