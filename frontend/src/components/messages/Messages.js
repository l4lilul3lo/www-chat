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
import { useContext, useRef, useState } from "react";
import Message from "../message/Message";
import "./messages.css";
const Messages = () => {
  // the problem is seeing what the previous state was. before next render.
  // for this we should use another ref.

  // and when messages is rendered, use previous ref of isBottom true to scroll to bottom.

  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const user = useSelector(selectUser);
  const ws = useContext(WebSocketContext);
  const room = useSelector(selectRoom);
  const messagesEl = useRef(null);
  const isAtBottom = useRef(null);
  async function handleScroll() {
    console.log("SCROLL HEIGHT", messagesEl.current.scrollHeight);
    const element = messagesEl.current;
    const isScrollBottom =
      Math.abs(
        element.scrollHeight - element.clientHeight - element.scrollTop
      ) < 1;
    isAtBottom.current = isScrollBottom;
  }
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

  // when user scrolls, if setUserControl hasn't been set, set it.

  // every time messages is updated, we should check previous ref.

  // user joins application and messages are updated, scroll should be set to bottom. We can determine this by checking if isAtBottom is null.

  // const firstLoad = isAtBottom === null;
  // const element = messagesEl.current;
  // if (firstLoad) {
  //   element.scrollTop = element.scrollHeight;
  //   isAtBottom.current = true;
  // } else {
  //   const wasAtBottom = isAtBottom.current;
  //   if (wasAtBottom) {
  //     element.scrollTop = element.scrollHeight;
  //   }
  // }

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

  useEffect(() => {
    const element = messagesEl.current;
    element.scrollTop = element.scrollHeight;
  }, [room]);

  // useEffect(() => {
  //   // by the time messages component is rendered and updated, the scroll position is no longer at the bottom.
  //   const element = messagesEl.current;
  //   const isAtBottom =
  //     Math.abs(
  //       element.scrollHeight - element.clientHeight - element.scrollTop
  //     ) < 5;
  //   console.log("isAtBottom", isAtBottom);
  //   if (isAtBottom) {
  //     element.scrollTop = element.scrollHeight;
  //   }
  // });

  // if socket connection is even lost for a moment, we have the issue of them not appearing the room anymore, even if react is doin its thang.

  return (
    <div className="messages" onScroll={handleScroll} ref={messagesEl}>
      {messages.map((message, i) => (
        <Message message={message} key={i} />
      ))}
    </div>
  );
};

export default Messages;
