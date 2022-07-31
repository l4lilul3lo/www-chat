import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { selectRoom } from "../../features/room/roomSlice";
import { useContext } from "react";
import autosize from "autosize";
import { WebSocketContext } from "../socket/WebSocketProvider";
import "./message_form.css";
const MessageForm = ({ messagesEl, messagesIsAtBottom }) => {
  const ws = useContext(WebSocketContext);
  const user = useSelector(selectUser);
  const room = useSelector(selectRoom);
  const textAreaEl = useRef(null);
  const prevHeight = useRef(null);
  const [content, setContent] = useState("");
  autosize(textAreaEl.current);
  function handleSubmit(e) {
    if (content.length < 1) {
      return;
    }
    const messageObj = {
      userId: user.id,
      roomId: room.id,
      content: content,
      color: user.settings.messageColor,
      background: user.settings.messageBackground,
    };
    ws.sendMessage(messageObj, user);
  }

  function handleKeyDown(e) {
    if (!e.shiftKey && e.code === "Enter") {
      handleSubmit(e.target.value);
      setContent("");
    }
  }

  function handleChange(e) {
    setContent(e.target.value === "\n" ? "" : e.target.value);

    const textAreaHeightChanged =
      prevHeight.current !== textAreaEl.current.clientHeight;

    if (textAreaHeightChanged && messagesIsAtBottom.current === true) {
      if (messagesIsAtBottom) {
        messagesEl.current.scrollTop = messagesEl.current.scrollHeight;
      }
    }
    prevHeight.current = textAreaEl.current.clientHeight;
  }

  return (
    <div className="message-form">
      <textarea
        ref={textAreaEl}
        placeholder={`send message to ${room.name}`}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={content}
      ></textarea>
      <div className="send-btn-container">
        <span className="material-symbols-outlined send-btn">send</span>
      </div>
    </div>
  );
};

export default MessageForm;
