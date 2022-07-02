import "./avatar.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
const Avatar = () => {
  const user = useSelector(selectUser);
  return (
    <div className="avatar-container">
      <img
        src={
          user.image
            ? user.image
            : "https://imagehostingserver.l4lilul3lo.repl.co/images/default-avatar.webp"
        }
      />
    </div>
  );
};

export default Avatar;
