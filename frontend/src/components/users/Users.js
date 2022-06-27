import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WebSocketContext } from "../socket/WebSocketProvider";
import { selectRoom } from "../../features/room/roomSlice";
import { setUsers, selectUsers } from "../../features/users/usersSlice";
const Users = () => {
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);
  const room = useSelector(selectRoom);

  useEffect(() => {
    // get all userInfo from websocket.
    setTimeout(() => {
      ws.getUsersInRoom(room.id);
    });

    // user id
    // user image
    // user name
  }, []);
};

export default Users;
