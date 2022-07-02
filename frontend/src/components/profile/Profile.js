import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import Avatar from "../avatar/Avatar";
import Settings from "../settings/Settings";
import "./profile.css";

const Profile = () => {
  const [display, toggleDisplay] = useState(false);
  const user = useSelector(selectUser);

  return (
    <div className="profile">
      <div className="profile-toggle" onClick={() => toggleDisplay(!display)}>
        <Avatar url={user.image} />
        <span className="material-symbols-outlined">settings</span>
      </div>
      {display && <Settings />}
    </div>
  );
};

export default Profile;
