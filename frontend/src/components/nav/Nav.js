import { addNotification } from "../../features/notifications/notificationsSlice";
import Profile from "../profile/Profile";
import "./nav.css";
import { useDispatch } from "react-redux";
import React from "react";

const Nav = () => {
  const dispatch = useDispatch();
  return (
    <div className="nav">
      <div className="nav-left">
        <img src="logo-small.png" />
      </div>

      <div className="nav-right">
        <Profile />
      </div>
    </div>
  );
};

export default Nav;
