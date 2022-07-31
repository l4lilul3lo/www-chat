import { useSelector } from "react-redux";
import { selectUsers } from "../../features/users/usersSlice";
import Avatar from "../avatar/Avatar";
import adminBadgeIcon from "./admin-badge-icon.png";
import "./users.css";

const Users = ({ slideIn }) => {
  const users = useSelector(selectUsers);

  const adminBadge = (
    <div className="admin-badge">
      <img src={adminBadgeIcon} />
    </div>
  );
  return (
    <div className={`users ${slideIn}`}>
      {users.map((user) => {
        return (
          <div className="users-user" key={user.name}>
            <div className="users-avatar-container">
              <Avatar url={user.image} />
            </div>
            <div className="user-info">
              {user.name}
              {user.isAdmin && adminBadge}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
