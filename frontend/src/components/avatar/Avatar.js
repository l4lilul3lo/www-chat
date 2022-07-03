import "./avatar.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";

const Avatar = ({ url }) => {
  {
    console.log("image url", url);
  }
  return (
    <div className="avatar-container">
      <img src={url ? url : "default-avatar.webp"} />
    </div>
  );
};

export default Avatar;
