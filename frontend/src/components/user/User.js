import Profile from "../profile/Profile";
import Settings from "../settings/Settings";
import { useEffect, useState } from "react";
import { setUser, selectUser, setRoom } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket/socket";
import "./user.css";

// get the user.
// if there is no user, no auth is set in user state.
// emit a room event, if room is cafe return cafe name and cafe id.

// then when a user joins a room in the future, provide a room id.
const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    console.log("user in user component", user);
  }, [dispatch]);
  return (
    <div className="user">
      <Profile />
    </div>
  );
};

export default User;
