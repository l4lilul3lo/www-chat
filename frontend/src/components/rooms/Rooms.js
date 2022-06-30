import { useSelector, useDispatch } from "react-redux";
import { selectRooms, setRooms } from "../../features/rooms/roomsSlice";
import { selectUser } from "../../features/user/userSlice";
import { setRoom, selectRoom } from "../../features/room/roomSlice";
import { useEffect, useState } from "react";

import CreateRoom from "../create_room/CreateRoom";

import Room from "../room/Room";
import { useContext } from "react";
import "./rooms.css";
const Rooms = () => {
  const dispatch = useDispatch();
  const rooms = useSelector(selectRooms);
  const [display, toggleDisplay] = useState(false);

  async function getRooms() {
    const response = await fetch("rooms/getRooms");
    const data = await response.json();

    dispatch(setRooms(data.rooms));
  }

  useEffect(() => {
    getRooms();
  }, []);

  async function createRoom(e) {}

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
      {rooms.map((room, i) => (
        <Room room={room} key={i} />
      ))}
    </div>
  );
};

export default Rooms;
