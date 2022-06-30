import "./message.css";
const Message = ({ message }) => {
  if (!message.content) {
    const { username } = message;
    const content = `${username} joined`;
    return <div className="user-joined">{content}</div>;
  } else {
    const author = message.user;
    const content = message.content;
    return (
      <div className="message">
        <div className="avatar">
          <img src={message.user.image} />
        </div>
        <div className="details">
          <div className="info">
            <div className="username">{message.user.name}</div>
            <div className="created-at">sometime</div>
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
