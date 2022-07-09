import "./message.css";
const MessageLoading = () => {
  return (
    <div className="message">
      <div className="message-avatar-container">
        <div className="avatar-loading"></div>
      </div>
      <div className="details">
        <div className="info">
          <div className="username-loading"></div>
          <div className="created-at-loading"></div>
        </div>
        <div
          className="content-loading"
          style={{ height: `${Math.floor(Math.random() * (200 - 30) + 30)}px` }}
        ></div>
      </div>
    </div>
  );
};

export default MessageLoading;
