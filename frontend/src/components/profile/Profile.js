import { useState } from "react";
import Avatar from "../avatar/Avatar";
import Settings from "../settings/Settings";
import "./profile.css";

const Profile = () => {
  const [display, toggleDisplay] = useState(false);

  return (
    <div className="profile" onClick={() => toggleDisplay(!display)}>
      <div className="profile-toggle">
        <Avatar />
        <span className="material-symbols-outlined">settings</span>
      </div>
      {true && <Settings />}
    </div>
  );
};

export default Profile;
