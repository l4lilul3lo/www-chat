import "./message.css";
const Message = ({ message }) => {
  console.log("message", message);
  if (message.type === "userJoined") {
    return (
      <div className="message">
        <div className="user-joined">{message.author}&nbsp;joined</div>
      </div>
    );
  }

  return (
    <div className="message">
      <div className="username">{message.author}:&nbsp;</div>
      <div className="content">{message.content}</div>
    </div>
  );
};

export default Message;
