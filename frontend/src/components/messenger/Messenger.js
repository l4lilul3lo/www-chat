import Messages from "../messages/Messages";
import MessageForm from "../message_form/MessageForm";
import { useState } from "react";
import "./messenger.css";

const Messenger = () => {
  const [messagesEl, setMessagesEl] = useState(null);
  const [messagesIsAtBottom, setMessagesIsAtBottom] = useState(null);

  return (
    <div className="messenger">
      <Messages
        setMessagesEl={setMessagesEl}
        setMessagesIsAtBottom={setMessagesIsAtBottom}
      />
      <MessageForm
        messagesEl={messagesEl}
        messagesIsAtBottom={messagesIsAtBottom}
      />
    </div>
  );
};

export default Messenger;
