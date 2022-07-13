import { useState, useEffect } from "react";
import RoomsSlide from "./RoomsSlide";
import UsersSlide from "./UsersSlide";
import { useSelector } from "react-redux";
import { selectRoomClicked } from "../../features/toggles/roomClickedSlice";
import "./overlay.css";
const Overlay = () => {
  const [openedComponent, setOpenedComponent] = useState("");
  const roomClicked = useSelector(selectRoomClicked);
  function handleRoomsToggle() {
    const value = openedComponent === "rooms" ? "" : "rooms";
    setOpenedComponent(value);
  }

  function handleUsersToggle() {
    const value = openedComponent === "users" ? "" : "users";
    setOpenedComponent(value);
  }

  function handleSettingsToggle() {
    const value = openedComponent === "settings" ? "" : "settings";
    setOpenedComponent(value);
  }

  function handleAnyToggle() {
    setOpenedComponent("");
  }

  const settingsOpen = openedComponent === "settings";
  const roomsOpen = openedComponent === "rooms";
  const usersOpen = openedComponent === "users";

  useEffect(() => {
    if (roomClicked !== null) {
      handleRoomsToggle();
    }
  }, [roomClicked]);

  return (
    <div className="overlay">
      <div className="small-screen">
        <div className="slide-toggles">
          <div className="rooms-toggle" onClick={handleRoomsToggle}>
            Rooms {roomsOpen ? "<" : ">"}
          </div>
          <div className="users-toggle" onClick={handleUsersToggle}>
            {usersOpen ? ">" : "<"} Users
          </div>
        </div>
        <RoomsSlide isVisible={roomsOpen} />
        <UsersSlide isVisible={usersOpen} />
      </div>
      {openedComponent && (
        <div className="grayed-out" onClick={handleAnyToggle}></div>
      )}
    </div>
  );
};

export default Overlay;
