import RoomsSlide from "./RoomsSlide";
import UsersSlide from "./UsersSlide";
import React, { useEffect } from "react";
const SmallScreen = ({
  handleRoomsToggle,
  handleUsersToggle,
  roomsOpen,
  usersOpen,
}) => {
  useEffect(() => {
    return () => {
      console.log("dismounted");
    };
  });
  return (
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
  );
};

export default SmallScreen;
