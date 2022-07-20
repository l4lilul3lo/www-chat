import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import Avatar from "../avatar/Avatar";
import Settings from "../settings/Settings";
import { toggleSettings } from "../../features/toggles/togglesSlice";
import "./profile.css";
import { v4 as uuidv4 } from "uuid";

const Profile = () => {
  const dispatch = useDispatch();
  const [displaySettings, toggleDisplaySettings] = useState(false);
  const user = useSelector(selectUser);

  return (
    <div className="profile-container">
      <div className="profile">
        <div
          className="profile-toggle"
          onClick={() => dispatch(toggleSettings())}
        >
          <Avatar key={uuidv4()} height={50} width={50} url={user.image} />
          <span className="material-symbols-outlined settings-gear">
            settings
          </span>
        </div>
      </div>
      {displaySettings && <Settings />}
    </div>
  );
};

export default Profile;
