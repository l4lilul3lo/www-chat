import "./settings.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import ImageUploader from "../image_uploader/ImageUploader.js";
import AvatarUploader from "../image_uploader/AvatarUploader";
import { toggleAvatarUpload } from "../../features/toggles/avatarUploadToggleSlice";
import { selectAvatarUploadIsToggled } from "../../features/toggles/avatarUploadToggleSlice";
import ColorPicker from "../color_picker/ColorPicker";
const Settings = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [avatarUploadIsToggled, setAvatarUploadIsToggled] = useState(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  async function handleLogout() {
    // const response = await
  }

  function handleToggleAvatarUpload() {
    console.log("fired");
    console.log(avatarUploadIsToggled);
    setAvatarUploadIsToggled(!avatarUploadIsToggled);
  }

  const anyToggled = avatarUploadIsToggled || displayColorPicker;

  return (
    <div className="settings-container">
      <div className="user-info">
        <div className="image-upload" onClick={handleToggleAvatarUpload}>
          <div className="image-upload-hover-text">Change Avatar</div>
          <div className="settings-avatar-container">
            <Avatar key={uuidv4()} url={user.image} />
          </div>

          <span className="material-symbols-outlined image-upload-icon">
            add_photo_alternate
          </span>
        </div>

        <h1>{user.name}</h1>
      </div>

      <div className="message-settings">
        <b>Your current message style</b>

        <div className="current-message-style">
          <div
            style={{
              color: user.settings.messageColor,
              background: user.settings.messageBackground,
            }}
          >
            example text
          </div>
        </div>
        <button onClick={() => setDisplayColorPicker(!displayColorPicker)}>
          edit
        </button>
      </div>

      <AvatarUploader
        handleToggleAvatarUpload={handleToggleAvatarUpload}
        avatarUploadIsToggled={avatarUploadIsToggled}
      />

      {displayColorPicker && (
        <ColorPicker
          displayColorPicker={displayColorPicker}
          setDisplayColorPicker={setDisplayColorPicker}
        />
      )}

      <button className="logout" onClick={handleLogout}>
        Logout
      </button>

      {anyToggled && <div className="gray-out-settings"></div>}
    </div>
  );
};

export default Settings;
