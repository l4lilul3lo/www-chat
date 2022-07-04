import { useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { selectRoom } from "../../features/room/roomSlice";
import { useContext } from "react";
import { WebSocketContext } from "../socket/WebSocketProvider";
const MessageForm = () => {
  const ws = useContext(WebSocketContext);
  const user = useSelector(selectUser);
  const room = useSelector(selectRoom);
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const messageObj = {
      userId: user.id,
      roomId: room.id,
      content: content,
      color: user.settings.messageColor,
      background: user.settings.messageBackground,
    };
    ws.sendMessage(messageObj, user);
    setContent("");
  }

  function handleChange(e) {
    setContent(e.target.value);
  }

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input type="text" value={content} onChange={handleChange} />

      <input type="submit" />
    </form>
  );
};

export default MessageForm;
