import Messages from "../messages/Messages";
import MessageForm from "../message_form/MessageForm";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { toggleRoomsSlideState } from "../../features/toggles/roomsSlideSlice";
import { toggleUsersSlideState } from "../../features/toggles/usersSlideSlice";
import { selectUsersSlideState } from "../../features/toggles/usersSlideSlice";
import { selectRoomsSlideState } from "../../features/toggles/roomsSlideSlice";
import { useSelector } from "react-redux";
import "./messenger.css";

const Messenger = () => {
  const dispatch = useDispatch();
  const usersSlideState = useSelector(selectUsersSlideState);
  const roomsSlideState = useSelector(selectRoomsSlideState);
  const [textAreaHeight, setTextAreaHeight] = useState();
  const [messagesEl, setMessagesEl] = useState(null);
  const [messagesIsAtBottom, setMessagesIsAtBottom] = useState(null);
  return (
    <div className="messenger">
      <div className="small-screen-menu">
        <div
          className="rooms-toggle"
          onClick={() => dispatch(toggleRoomsSlideState())}
        >
          Rooms {roomsSlideState === "slide-in-left" ? "<" : ">"}
        </div>
        <div
          className="users-toggle"
          onClick={() => dispatch(toggleUsersSlideState())}
        >
          {usersSlideState === "slide-in-right" ? ">" : "<"} Users
        </div>
      </div>
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
