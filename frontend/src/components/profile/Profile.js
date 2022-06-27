import { useSelector, useDispatch } from "react-redux";
import Settings from "../settings/Settings";
import "./profile.css";
import { selectUser, setUser } from "../../features/user/userSlice";
import { useState, useEffect, useContext } from "react";
import { WebSocketContext } from "../socket/WebSocketProvider";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const ws = useContext(WebSocketContext);

  const [display, toggleDisplay] = useState(false);

  async function getUser() {
    const response = await fetch("users/getUser");
    const data = await response.json();

    dispatch(setUser(data));
  }

  useEffect(() => {
    // getUser();
  }, []);

  return (
    <div className="profile" onClick={() => toggleDisplay(!display)}>
      <div className="img-container">
        <img src={user.image ? user.image : "anon-avatar.svg"} />
        <span className="material-symbols-outlined">settings</span>
      </div>
      {display && <Settings />}
    </div>
  );
};

export default Profile;
