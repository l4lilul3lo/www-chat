import "./createRoom.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { WebSocketContext } from "../socket/WebSocketProvider";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCreateRoomIsToggled,
  toggleCreateRoom,
} from "../../features/toggles/createRoomToggleSlice";
import {
  selectSocketMessage,
  setSocketMessage,
} from "../../features/socket_messages/socketMessageSlice";
const CreateRoom = () => {
  const dispatch = useDispatch();
  const createRoomIsToggled = useSelector(selectCreateRoomIsToggled);
  const socketMessage = useSelector(selectSocketMessage);
  const ws = useContext(WebSocketContext);
  const [room, setRoom] = useState({
    name: "",
    password: null,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(room.name, room.password);
    if (!room.name) {
      return;
    }
    ws.createRoom(room.name, room.password);
  }

  useEffect(() => {
    return () => dispatch(setSocketMessage(""));
  }, []);
  function handleChange(e) {
    setRoom((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  if (!createRoomIsToggled) {
    return null;
  }

  return (
    <div className="create-room-container">
      <div className="x-close" onClick={() => dispatch(toggleCreateRoom())}>
        X
      </div>
      <form onSubmit={handleSubmit}>
        <div className="socket-message">{socketMessage}</div>
        <label for="room-name">Room Name</label>
        <input type="text" id="name" onChange={handleChange} />
        <label for="room-password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="on"
          onChange={handleChange}
        />
        <input type="submit" value="create room" />
      </form>
    </div>
  );
};

export default CreateRoom;
