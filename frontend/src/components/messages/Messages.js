import { useState, useEffect } from "react";
import { socket } from "../../socket/socket";
import Message from "../message/Message";

import "./messages.css";
const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("message", (msg) => {
      console.log("msg", msg);
      setMessages((prev) => {
        console.log(prev);
        let newMessages;
        if (prev.length >= 40) {
          const slicedPrev = prev.slice(0, 10);
          newMessages = [...slicedPrev, msg];
          return newMessages;
        } else {
          newMessages = [...prev, msg];
          return newMessages;
        }
      });
    });
  }, []);

  return (
    <div className="messages">
      {messages.map((message, i) => {
        return <Message message={message} key={i} />;
      })}
    </div>
  );
};

export default Messages;
