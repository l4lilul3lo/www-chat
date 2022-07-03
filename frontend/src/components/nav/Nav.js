import Profile from "../profile/Profile";
import "./nav.css";

const Nav = () => {
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
