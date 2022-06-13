import "./settings.css";
import { useSelector } from "react-redux";
import { selectSettings } from "../../features/settings/settingsSlice";
import { selectUser } from "../../features/user/userSlice";
const Settings = () => {
  const user = useSelector(selectUser);

  return (
    <div className="settings">
      <h1>{user.name}</h1>
      <h1>{user.settings.messageColor}</h1>
      <h1>{user.settings.messageBackground}</h1>
    </div>
  );
};

export default Settings;
