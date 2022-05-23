import { Outlet, Link } from "react-router-dom";
import Profile from "../profile/Profile";
import "./anon.css";
const Anon = () => {
  return (
    <div className="anon">
      <Profile />
      <Link to="/register">register</Link>
      <Link to="/login">login</Link>
    </div>
  );
};

export default Anon;
