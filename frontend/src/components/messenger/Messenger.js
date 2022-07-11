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
  const isRoomsSlideIn = roomsSlideState === "slide-in-left";
  const isUsersSlideIn = usersSlideState === "slide-in-right";
  const anySlideIn = isRoomsSlideIn || isUsersSlideIn;

  function handleRoomsToggle() {
    if (isUsersSlideIn) {
      dispatch(toggleUsersSlideState());
    }

    dispatch(toggleRoomsSlideState());
  }

  function handleUsersToggle() {
    if (isRoomsSlideIn) {
      dispatch(toggleRoomsSlideState());
    }
    dispatch(toggleUsersSlideState());
  }

  function handleAnyToggle() {
    if (isRoomsSlideIn) {
      dispatch(toggleRoomsSlideState());
    }

    if (isUsersSlideIn) {
      dispatch(toggleUsersSlideState());
    }
  }
  return (
    <div className="messenger">
      <div className="small-screen-menu">
        <div className="rooms-toggle" onClick={handleRoomsToggle}>
          Rooms {isRoomsSlideIn ? "<" : ">"}
        </div>
        <div className="users-toggle" onClick={handleUsersToggle}>
          {isUsersSlideIn === "slide-in-right" ? ">" : "<"} Users
        </div>
      </div>
      {anySlideIn && (
        <div className="grayed-out" onClick={handleAnyToggle}></div>
      )}
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
