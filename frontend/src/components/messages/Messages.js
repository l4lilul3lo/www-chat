import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectMessagesState } from "../../features/messages/messagesSlice";
import { selectRoom } from "../../features/room/roomSlice";
import Message from "../message/Message";
import MessageLoading from "../message/MessageLoading";
import Notifications from "../notifications/Notifications";
import "./messages.css";

const Messages = ({ textAreaHeight, setMessagesEl, setMessagesIsAtBottom }) => {
  const messagesState = useSelector(selectMessagesState);
  const room = useSelector(selectRoom);
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
  }, [messagesState, textAreaHeight]);

  useEffect(() => {
    const element = messagesEl.current;
    element.scrollTop = element.scrollHeight;
  }, [room]);

  useEffect(() => {
    setMessagesEl(messagesEl);
    setMessagesIsAtBottom(isAtBottom);
  }, []);

  const noMessagesYet = <div className="no-messages-yet"></div>;

  return (
    <div className="messages" onScroll={handleScroll} ref={messagesEl}>
      {messagesState.isLoading
        ? [...new Array(40)].map((x) => <MessageLoading />)
        : messagesState.messages.map((message, i) => (
            <Message message={message} key={i} />
          ))}
    </div>
  );
};

export default Messages;
