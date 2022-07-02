import "./settings.css";
import { useSelector } from "react-redux";
import { selectSettings } from "../../features/settings/settingsSlice";
import { selectUser } from "../../features/user/userSlice";
import Avatar from "../avatar/Avatar";
import ImageUploader from "../image_uploader/ImageUploader.js";
const Settings = () => {
  const user = useSelector(selectUser);

  return (
    <div className="settings">
      <div className="user-info">
        <div className="image-upload">
          <Avatar />
          <span className="material-symbols-outlined image-upload-icon">
            add_photo_alternate
          </span>
        </div>

        <h1>{user.name}</h1>
      </div>

      <div className="message-settings">
        <h1>{user.settings.messageColor}</h1>
        <h1>{user.settings.messageBackground}</h1>
      </div>

      {true && <ImageUploader />}
    </div>
  );
};

export default Settings;
