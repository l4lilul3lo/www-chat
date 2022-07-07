import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "../../features/messages/messagesSlice";
import Message from "../message/Message";
import "./messages.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const Messages = () => {
  const messages = useSelector(selectMessages);
  const messagesEl = useRef(null);
  const isAtBottom = useRef(null);
  async function handleScroll() {
    const element = messagesEl.current;
    const isScrollBottom =
      Math.abs(
        element.scrollHeight - element.clientHeight - element.scrollTop
      ) < 1;
    isAtBottom.current = isScrollBottom;
  }

  useEffect(() => {
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
  }, [messages]);

  return (
    <div className="messages" onScroll={handleScroll} ref={messagesEl}>
      {messages.map((message, i) => (
        <Message message={message} key={i} />
      ))}
    </div>
  );
};

export default Messages;
