import "./settings.css";
import { useSelector, useDispatch } from "react-redux";
import { selectSettings } from "../../features/settings/settingsSlice";
import { selectUser } from "../../features/user/userSlice";
import { useState } from "react";
import Avatar from "../avatar/Avatar";
import ImageUploader from "../image_uploader/ImageUploader.js";
import { toggleAvatarUpload } from "../../features/toggles/avatarUploadToggleSlice";
import ColorPicker from "../color_picker/ColorPicker";
const Settings = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [displayImageUploader, setDisplayImageUploader] = useState(false);

  return (
    <div className="settings-container">
      <div className="user-info">
        <div
          className="image-upload"
          onClick={() => dispatch(toggleAvatarUpload())}
        >
          <div className="image-upload-hover-text">Change Avatar</div>
          <div className="settings-avatar-container">
            <Avatar url={user.image} />
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

      {displayImageUploader && <ImageUploader />}

      {displayColorPicker && (
        <ColorPicker
          displayColorPicker={displayColorPicker}
          setDisplayColorPicker={setDisplayColorPicker}
        />
      )}
    </div>
  );
};

export default Settings;
