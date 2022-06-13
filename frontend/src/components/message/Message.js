import "./message.css";
const Message = ({ message }) => {
  return (
    <div className="message">
      <div className="username">{message.name}:&nbsp;</div>
      <div className="content">{message.content}</div>
    </div>
  );
};

export default Message;
