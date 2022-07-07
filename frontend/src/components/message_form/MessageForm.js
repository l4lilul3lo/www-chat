import { useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { selectRoom } from "../../features/room/roomSlice";
import { useContext } from "react";
import { WebSocketContext } from "../socket/WebSocketProvider";
import "./message_form.css";
const MessageForm = () => {
  const ws = useContext(WebSocketContext);
  const user = useSelector(selectUser);
  const room = useSelector(selectRoom);
  const textAreaEl = useRef(null);
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    console.log("content on submit", content);
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

  function handleKeyPress(e) {
    if (e.charCode === 13 && !e.shiftKey) {
      handleSubmit();
    }
  }

  function handleChange(e) {
    const element = textAreaEl.current;
    element.style.height = "0px";
    element.style.height = element.scrollHeight + "px";
    console.log(element.style.height);
    console.log("Value", e.target.value);
    console.log("VALUE is newline", e.target.value === "\n");
    setContent(e.target.value === "\n" ? "" : e.target.value);
  }

  return (
    <form className="message-form">
      <textarea
        value={content}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={`Send message to ${room.name}`}
        ref={textAreaEl}
      />
      <span class="material-symbols-outlined send-btn">send</span>
    </form>
  );
};

export default MessageForm;
