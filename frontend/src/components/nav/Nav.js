import Profile from "../profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../features/user/userSlice";
import { useEffect } from "react";
import "./nav.css";

const Nav = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);

  async function getUser() {
    const response = await fetch("getUser");
    const data = await response.json();
    console.log("getUser response in Nav Component", data);
    dispatch(setUser(data));
  }

  useEffect(() => {
    getUser();
  }, []);

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
