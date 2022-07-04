import "./settings.css";
import { useSelector } from "react-redux";
import { selectSettings } from "../../features/settings/settingsSlice";
import { selectUser } from "../../features/user/userSlice";
import { useState } from "react";
import Avatar from "../avatar/Avatar";
import ImageUploader from "../image_uploader/ImageUploader.js";
import ColorPicker from "../color_picker/ColorPicker";
const Settings = () => {
  const user = useSelector(selectUser);
  const [displayImageUploader, setDisplayImageUploader] = useState(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [background, setBackground] = useState();
  const [color, setColor] = useState();

  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };

  return (
    <div className="settings-container">
      <div className="settings">
        <div className="user-info">
          <div
            className="image-upload"
            onClick={() => setDisplayImageUploader(!displayImageUploader)}
          >
            <Avatar url={user.image} />
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

        {displayImageUploader && (
          <ImageUploader
            displayImageUploader={displayImageUploader}
            setDisplayImageUploader={setDisplayImageUploader}
          />
        )}

        {displayColorPicker && (
          <ColorPicker
            displayColorPicker={displayColorPicker}
            setDisplayColorPicker={setDisplayColorPicker}
          />
        )}
      </div>
    </div>
  );
};

export default Settings;
