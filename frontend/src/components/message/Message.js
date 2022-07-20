import React from "react";
import "./message.css";
import Avatar from "../avatar/Avatar";
const Message = ({ message }) => {
  if (!message.content) {
    const { username } = message;
    const content = `${username} joined`;
    return <div className="user-joined">{content}</div>;
  } else {
    const author = message.user;
    const content = message.content;
    const date = new Date(message.createdAt);
    const time = date.toLocaleString("en-US", {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return (
      <div className="message">
        <div className="message-avatar-container">
          <Avatar url={message.user.image} />
        </div>
        <div className="details">
          <div className="info">
            <div className="username">{message.user.name}</div>
            <div className="created-at">{time}</div>
          </div>
          <div
            className="content"
            style={{ color: message.color, background: message.background }}
          >
            {message.content}
          </div>
        </div>
      </div>
    );
  }
};

export default Message;
