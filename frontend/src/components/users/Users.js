import { useSelector } from "react-redux";
import { selectUsers } from "../../features/users/usersSlice";
import Avatar from "../avatar/Avatar";
import "./users.css";

const Users = ({ slideIn }) => {
  const users = useSelector(selectUsers);

  return (
    <div className={`users ${slideIn}`}>
      {users.map((user) => {
        return (
          <div className="users-user">
            <div className="users-avatar-container">
              <Avatar url={user.image} />
            </div>
            <div>{user.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
