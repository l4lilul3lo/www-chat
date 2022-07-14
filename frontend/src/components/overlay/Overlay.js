import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectRoomClicked } from "../../features/toggles/roomClickedSlice";
import { selectToggles } from "../../features/toggles/togglesSlice";
import {
  toggleRooms,
  toggleUsers,
  toggleSettings,
  closeAll,
} from "../../features/toggles/togglesSlice";
import SmallScreen from "./SmallScreen";
import SettingsModal from "./SettingsModal";
import "./overlay.css";
const Overlay = () => {
  const dispatch = useDispatch();
  const roomClicked = useSelector(selectRoomClicked);
  const toggles = useSelector(selectToggles);
  const { usersOpen, roomsOpen, settingsOpen } = toggles;
  const anyOpen = Object.values(toggles).includes(true);

  function handleRoomsToggle() {
    dispatch(toggleRooms());
  }

  function handleUsersToggle() {
    dispatch(toggleUsers());
  }

  function handleSettingsToggle() {
    dispatch(toggleSettings());
  }

  function handleCloseAll() {
    dispatch(closeAll());
  }

  console.log("anyOpen", anyOpen);
  useEffect(() => {
    if (roomClicked !== null) {
      handleRoomsToggle();
    }
  }, [roomClicked]);

  return (
    <div className="overlay">
      <SmallScreen
        handleRoomsToggle={handleRoomsToggle}
        handleUsersToggle={handleUsersToggle}
        roomsOpen={roomsOpen}
        usersOpen={usersOpen}
      />

      <SettingsModal isVisible={settingsOpen} />
      {anyOpen && <div className="grayed-out" onClick={handleCloseAll}></div>}
    </div>
  );
};

// all toggles can now be put in a single feature.
// toggleStates can be an object with properties.
export default Overlay;
