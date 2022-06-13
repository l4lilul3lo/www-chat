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
  const ws = useContext(WebSocketContext);
  return (
    <div className="messages">
      {messages.map((message, i) => (
        <Message message={message} key={i} />
      ))}
    </div>
  );
};

export default Messages;
