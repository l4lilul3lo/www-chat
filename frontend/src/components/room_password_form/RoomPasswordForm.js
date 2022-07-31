import { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessagesIsLoading } from "../../features/messages/messagesSlice";
import { selectPendingRoom, selectRoom } from "../../features/room/roomSlice";
import { WebSocketContext } from "../socket/WebSocketProvider";
import { selectSocketMessage } from "../../features/socket_messages/socketMessageSlice";
import { setSocketMessage } from "../../features/socket_messages/socketMessageSlice";

import "./room_password_form.css";

const RoomPasswordForm = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const room = useSelector(selectRoom);
  const socketMessage = useSelector(selectSocketMessage);
  const pendingRoom = useSelector(selectPendingRoom);
  const ws = useContext(WebSocketContext);

  function handleChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    ws.joinRoom(pendingRoom, password);
  }

  useEffect(() => {
    return () => {
      if (room !== pendingRoom) {
        dispatch(setMessagesIsLoading(false));
      }
      dispatch(setSocketMessage(""));
    };
  }, []);

  return (
    <form className="room-password-form" onSubmit={handleSubmit}>
      <label htmlFor="">Enter Room Password</label>
      <input type="password" onChange={handleChange} />
      <input type="submit" />
      <div className="socket-message">{socketMessage}</div>
    </form>
  );
};

export default RoomPasswordForm;
