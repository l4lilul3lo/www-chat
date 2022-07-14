import "./createRoom.css";
import { useState } from "react";
import { useContext } from "react";
import { WebSocketContext } from "../socket/WebSocketProvider";
const CreateRoom = ({ toggleDisplay, display }) => {
  const ws = useContext(WebSocketContext);
  const [room, setRoom] = useState({
    name: "",
    password: null,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    ws.createRoom(room);
  }

  function handleChange(e) {
    setRoom((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  return (
    <div className="create-room-container">
      <div className="x-close" onClick={() => toggleDisplay(!display)}>
        X
      </div>
      <form onSubmit={handleSubmit}>
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
