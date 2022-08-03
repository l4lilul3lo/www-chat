import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectRoomClicked } from "../../features/toggles/roomClickedSlice";
import { selectToggles } from "../../features/toggles/togglesSlice";
import {
  toggleRooms,
  toggleUsers,
  closeAll,
} from "../../features/toggles/togglesSlice";
import SmallScreen from "./SmallScreen";
import SettingsModal from "./SettingsModal";
import RoomPasswordModal from "./RoomPasswordModal";
import "./overlay.css";
const Overlay = () => {
  const dispatch = useDispatch();
  const roomClicked = useSelector(selectRoomClicked);
  const toggles = useSelector(selectToggles);
  const { usersOpen, roomsOpen, settingsOpen, roomPasswordFormOpen } = toggles;
  const anyOpen = Object.values(toggles).includes(true);

  function handleRoomsToggle() {
    dispatch(toggleRooms());
  }

  function handleUsersToggle() {
    dispatch(toggleUsers());
  }

  function handleCloseAll() {
    dispatch(closeAll());
  }

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
      <RoomPasswordModal isVisible={roomPasswordFormOpen} />
      {anyOpen && <div className="grayed-out" onClick={handleCloseAll}></div>}
    </div>
  );
};

export default Overlay;
