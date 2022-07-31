import { useSelector, useDispatch } from "react-redux";
import { selectRoomsState } from "../../features/rooms/roomsSlice";
import CreateRoom from "../create_room/CreateRoom";
import RoomLoading from "../room/RoomLoading";
import Room from "../room/Room";
import "./rooms.css";
import { toggleCreateRoom } from "../../features/toggles/createRoomToggleSlice";
import addIcon from "./add_icon.png";
const Rooms = ({ slideIn }) => {
  const dispatch = useDispatch();
  const roomsState = useSelector(selectRoomsState);

  return (
    <div className={`rooms ${slideIn}`}>
      <CreateRoom />
      <div className="rooms-header">
        <div>Rooms</div>
        <img
          className="add-icon"
          src={addIcon}
          onClick={() => dispatch(toggleCreateRoom())}
          alt="create room"
        />
      </div>

      {roomsState.isLoading
        ? [...new Array(20)].map((x, i) => <RoomLoading key={i} />)
        : roomsState.rooms.map((room, i) => <Room room={room} key={i} />)}
    </div>
  );
};

export default Rooms;
