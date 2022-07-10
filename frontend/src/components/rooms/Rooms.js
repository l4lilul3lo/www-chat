import { useSelector, useDispatch } from "react-redux";
import {
  selectRoomsState,
  setRooms,
  selectRoomsIsLoading,
} from "../../features/rooms/roomsSlice";
import { selectUser } from "../../features/user/userSlice";
import { setRoom, selectRoom } from "../../features/room/roomSlice";
import { useEffect, useState } from "react";
import { selectRoomsSlideState } from "../../features/toggles/roomsSlideSlice";
import CreateRoom from "../create_room/CreateRoom";
import RoomLoading from "../room/RoomLoading";

import Room from "../room/Room";
import { useContext } from "react";
import "./rooms.css";
const Rooms = () => {
  const dispatch = useDispatch();
  const roomsState = useSelector(selectRoomsState);
  const slideState = useSelector(selectRoomsSlideState);
  const [display, toggleDisplay] = useState(false);

  async function createRoom(e) {}
  console.log("roomsstate isloading", roomsState.isLoading);

  return (
    <div className={`rooms-container ${slideState}`}>
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
      {roomsState.isLoading
        ? [...new Array(20)].map((x) => <RoomLoading />)
        : roomsState.rooms.map((room, i) => <Room room={room} key={i} />)}
    </div>
  );
};

export default Rooms;
