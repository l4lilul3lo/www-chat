import Profile from "../profile/Profile";
import Settings from "../settings/Settings";
import { useEffect, useState } from "react";
import { setUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import "./user.css";
// check for auth here.
// conditionally render profile.

// for user profile info, an auth middleware will be used anyway.
// render based on value of user info?
const User = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function getUser() {
      const response = await fetch("http://localhost:9000/getUser");
      const data = await response.json();
      // set user in redux
      dispatch(setUser(data.user));
    })();
  }, []);

  return (
    <div className="user">
      <Profile />
      <Settings />
    </div>
  );
};

export default User;
