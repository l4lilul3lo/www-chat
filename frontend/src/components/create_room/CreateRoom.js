import "./createRoom.css";
import { useState } from "react";
import { useContext } from "react";
import { WebSocketContext } from "../socket/WebSocketProvider";
const CreateRoom = ({ toggleDisplay, display }) => {
  const ws = useContext(WebSocketContext);
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();

    ws.addRoom(inputs.name, inputs.password);
  }

  function handleChange(e) {
    setInputs((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  return (
    <div className="create-room-container">
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
      <div onClick={() => toggleDisplay(!display)}>X</div>
    </div>
  );
};

export default CreateRoom;