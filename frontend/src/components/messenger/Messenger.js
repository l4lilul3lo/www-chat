import Messages from "../messages/Messages";
import MessageForm from "../message_form/MessageForm";
import { useContext } from "react";
import "./messenger.css";

const Messenger = () => {
  return (
    <div className="messenger">
      <Messages />
      <MessageForm />
    </div>
  );
};

export default Messenger;
