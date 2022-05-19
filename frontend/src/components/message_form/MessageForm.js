import { useState } from "react";
import { socket } from "../../socket/socket";
const MessageForm = () => {
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const messageObj = {
      username: "john",
      content: "hi",
      style: { color: "red", background: "black" },
    };

    socket.emit("message", content);
    setContent("");
  }

  function handleChange(e) {
    setContent(e.target.value);
  }

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input type="text" value={content} onChange={handleChange} />
      <input type="submit" />
    </form>
  );
};

export default MessageForm;
