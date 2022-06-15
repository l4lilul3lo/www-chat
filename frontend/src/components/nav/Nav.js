import Profile from "../profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../features/user/userSlice";
import { useEffect } from "react";
import "./nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <img src="logo-small.png" />
      <div className="nav-right">
        <Profile />
      </div>
    </div>
  );
};

export default Nav;
