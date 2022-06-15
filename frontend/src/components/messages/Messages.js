import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WebSocketContext } from "../socket/WebSocketProvider";
import {
  addMessage,
  selectMessages,
  setMessages,
} from "../../features/messages/messagesSlice";
import { selectUser } from "../../features/user/userSlice";
import { selectRoom, setRoom } from "../../features/room/roomSlice";
import { useContext } from "react";
import Message from "../message/Message";
import "./messages.css";
const Messages = () => {
  const messages = useSelector(selectMessages);
  const user = useSelector(selectUser);
  const ws = useContext(WebSocketContext);

  async function getCafeId() {
    const response = await fetch("/getCafeId");
    const data = await response.json();
    return data.cafeId;
  }

  async function startInRoom() {
    const storedRoom = localStorage.getItem("cafeId");
    console.log("start in room called");
    console.log("username", user.name);
    if (!storedRoom) {
      const cafeId = await getCafeId();
      console.log("not stored room call", cafeId);
      ws.joinRoom(user.name, cafeId);
    } else {
      ws.joinRoom(user.name, storedRoom);
    }
  }

  useEffect(() => {
    startInRoom();
  }, []);

  return (
    <div className="messages">
      {messages.map((message, i) => (
        <Message message={message} key={i} />
      ))}
    </div>
  );
};

export default Messages;
