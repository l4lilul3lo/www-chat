import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { selectRoom } from "../../features/room/roomSlice";
import { useContext } from "react";
import { WebSocketContext } from "../socket/WebSocketProvider";
import "./message_form.css";
const MessageForm = ({ setTextAreaHeight }) => {
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
    const prevHeight = element.style.height;
    // save previous height and if previous height and new height are different, re-render messenger component so that the elements are positioned correctly.
    element.style.height = "0px";
    element.style.height = element.scrollHeight + "px";
    console.log(prevHeight, element.style.height);
    if (prevHeight != element.style.height) {
      setTextAreaHeight(element.style.height);
      // re-render messenger
      // set scroll of messages element to bottom every time
    }
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
