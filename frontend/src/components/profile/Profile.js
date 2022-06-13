import { useSelector, useDispatch } from "react-redux";
import Settings from "../settings/Settings";
import "./profile.css";
import { selectUser, setUser } from "../../features/user/userSlice";
import { useState, useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [display, toggleDisplay] = useState(false);

  async function getUser() {
    const response = await fetch("user/getUser");
    const data = await response.json();
    console.log("getUser response in Nav Component", data);
    dispatch(setUser(data));
  }

  useEffect(() => {
    getUser();
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
