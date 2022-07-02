import "./avatar.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";

const Avatar = ({ url }) => {
  return (
    <div className="avatar-container">
      <img src={"default-avatar.webp"} />
    </div>
  );
};

export default Avatar;
