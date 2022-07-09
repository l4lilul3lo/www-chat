import { useSelector, useDispatch } from "react-redux";
import {
  selectRoomsState,
  setRooms,
  selectRoomsIsLoading,
} from "../../features/rooms/roomsSlice";
import { selectUser } from "../../features/user/userSlice";
import { setRoom, selectRoom } from "../../features/room/roomSlice";
import { useEffect, useState } from "react";
import RoomsLoading from "./RoomsLoading";
import CreateRoom from "../create_room/CreateRoom";

import Room from "../room/Room";
import { useContext } from "react";
import "./rooms.css";
const Rooms = () => {
  const dispatch = useDispatch();
  const roomsState = useSelector(selectRoomsState);
  const [display, toggleDisplay] = useState(false);

  async function createRoom(e) {}
  console.log("roomsstate isloading", roomsState.isLoading);
  if (roomsState.isLoading) {
    return <RoomsLoading />;
  }

  return (
    <div className="rooms-container">
      {display && (
        <CreateRoom toggleDisplay={toggleDisplay} display={display} />
      )}
      <div className="rooms-header">
        <div>Rooms</div>
        <span
          className="material-symbols-outlined"
          onClick={() => toggleDisplay(!display)}
        >
          add
        </span>
      </div>
      {roomsState.rooms.map((room, i) => (
        <Room room={room} key={i} />
      ))}
    </div>
  );
};

export default Rooms;
