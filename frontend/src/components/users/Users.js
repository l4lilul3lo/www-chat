import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WebSocketContext } from "../socket/WebSocketProvider";
import { selectRoom } from "../../features/room/roomSlice";
import { setUsers, selectUsers } from "../../features/users/usersSlice";
// figure out getting user back into server sockets list on disconnect.
const Users = () => {
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);
  const room = useSelector(selectRoom);
};

export default Users;
