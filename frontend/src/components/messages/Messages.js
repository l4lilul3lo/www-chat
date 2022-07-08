import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "../../features/messages/messagesSlice";
import Message from "../message/Message";
import "./messages.css";

const Messages = ({ textAreaHeight, setMessagesEl, setMessagesIsAtBottom }) => {
  const messages = useSelector(selectMessages);
  const messagesEl = useRef(null);
  const isAtBottom = useRef(null);
  async function handleScroll() {
    console.log("handle scroll fired");
    const element = messagesEl.current;
    const isScrollBottom =
      Math.abs(
        element.scrollHeight - element.clientHeight - element.scrollTop
      ) < 1;
    isAtBottom.current = isScrollBottom;
  }

  useEffect(() => {
    console.log("useeffect fired");
    const firstLoad = isAtBottom.current === null;
    const element = messagesEl.current;
    if (firstLoad) {
      element.scrollTop = element.scrollHeight;
      isAtBottom.current = true;
    } else {
      const wasAtBottom = isAtBottom.current;
      if (wasAtBottom) {
        element.scrollTop = element.scrollHeight;
      }
    }
  }, [messages, textAreaHeight]);

  useEffect(() => {
    setMessagesEl(messagesEl);
    setMessagesIsAtBottom(isAtBottom);
  }, []);
  return (
    <div className="messages" onScroll={handleScroll} ref={messagesEl}>
      {messages.map((message, i) => (
        <Message message={message} key={i} />
      ))}
    </div>
  );
};

export default Messages;
