import Messages from "../messages/Messages";
import MessageForm from "../message_form/MessageForm";
import { useState } from "react";
import "./messenger.css";

const Messenger = () => {
  const [textAreaHeight, setTextAreaHeight] = useState();
  return (
    <div className="messenger">
      <Messages textAreaHeight={textAreaHeight} />
      <MessageForm setTextAreaHeight={setTextAreaHeight} />
    </div>
  );
};

export default Messenger;
