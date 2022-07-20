import React from "react";
import "./rooms.css";
const RoomsLoading = () => {
  return (
    <div className="rooms">
      <div className="rooms-header">
        <div>Rooms</div>
        <span className="material-symbols-outlined">add</span>
      </div>
      {[...new Array(20)].map((x, i) => (
        <div className="room-loading"></div>
      ))}
    </div>
  );
};

export default RoomsLoading;
