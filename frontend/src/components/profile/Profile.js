import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import Avatar from "../avatar/Avatar";
import Settings from "../settings/Settings";
import "./profile.css";

const Profile = () => {
  const [displaySettings, toggleDisplaySettings] = useState(false);
  const user = useSelector(selectUser);

  return (
    <div className="profile-container">
      <div className="profile">
        <div
          className="profile-toggle"
          onClick={() => toggleDisplaySettings(!displaySettings)}
        >
          <Avatar url={user.image} />
          <span className="material-symbols-outlined">settings</span>
        </div>
      </div>
      {displaySettings && <Settings />}
    </div>
  );
};

export default Profile;
// profile
// settings
