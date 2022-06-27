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
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const user = useSelector(selectUser);
  const ws = useContext(WebSocketContext);

  async function getCafeId() {
    const response = await fetch("rooms/getCafeId");
    const data = await response.json();
    return data.cafeId;
  }

  async function getMessages(roomId) {
    const response = await fetch("messages/getMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId }),
    });
    const data = await response.json();
    return data.messages;
  }

  async function startInRoom() {
    const storedRoomId = localStorage.getItem("storedRoomId");

    if (!storedRoomId) {
      const cafeId = await getCafeId();
      ws.joinRoom(user.id, user.name, cafeId);

      const messages = await getMessages(cafeId);
      dispatch(setMessages(messages));
    } else {
      ws.joinRoom(user.id, user.name, storedRoomId);
      const messages = getMessages(storedRoomId);
      dispatch(setMessages(messages));
    }
  }

  // socket should be connected to room first, then messages should be loaded.

  useEffect(() => {}, []);

  return (
    <div className="messages">
      {messages.map((message, i) => (
        <Message message={message} key={i} />
      ))}
    </div>
  );
};

export default Messages;
