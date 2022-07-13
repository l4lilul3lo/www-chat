import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { selectRoomsState } from "../../features/rooms/roomsSlice";
import CreateRoom from "../create_room/CreateRoom";
import RoomLoading from "../room/RoomLoading";
import Room from "../room/Room";
import "./rooms.css";

const Rooms = ({ slideIn }) => {
  const roomsState = useSelector(selectRoomsState);
  const [display, toggleDisplay] = useState(false);
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  console.log("rooms renders", renderCounter.current);

  useEffect(() => {
    return () => {
      console.log("ROOMS DISMOUNTED");
    };
  }, []);

  return (
    <div className={`rooms-container ${slideIn}`}>
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
        ? [...new Array(20)].map((x, i) => <RoomLoading key={i} />)
        : roomsState.rooms.map((room, i) => <Room room={room} key={i} />)}
    </div>
  );
};

export default Rooms;
