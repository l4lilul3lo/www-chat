import { useState } from "react";
import { socket, sendMessage } from "../../socket/socket";
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
    console.log("roomId", room.id);
    console.log("userId", user.id);
    console.log("content", content);
    console.log("userBackground", user.settings.messageBackground);
    const messageObj = {
      userName: user.name,
      userId: user.id,
      roomId: room.id,
      roomName: room.name,
      content: content,
      background: user.settings.messageBackground,
      color: user.settings.messageColor,
    };
    ws.sendMessage(messageObj);
    setContent("");
  }

  function handleChange(e) {
    console.log("current input state", content);
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
