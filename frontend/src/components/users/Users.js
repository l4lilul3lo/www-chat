import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WebSocketContext } from "../socket/WebSocketProvider";
import { selectRoom } from "../../features/room/roomSlice";
import { setUsers, selectUsers } from "../../features/users/usersSlice";
import Avatar from "../avatar/Avatar";
import "./users.css";
// figure out getting user back into server sockets list on disconnect.
const Users = () => {
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);
  const room = useSelector(selectRoom);
  const users = useSelector(selectUsers);

  return (
    <div className="users">
      {users.map((user) => {
        return (
          <div className="users-user">
            <Avatar className="avatar" url={user.image} />
            <h1>{user.name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
