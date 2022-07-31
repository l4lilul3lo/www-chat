import Profile from "../profile/Profile";
import "./nav.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleRooms, toggleUsers } from "../../features/toggles/togglesSlice";
import { selectToggles } from "../../features/toggles/togglesSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const toggles = useSelector(selectToggles);
  const { usersOpen, roomsOpen } = toggles;
  return (
    <div className="nav">
      <div className="nav-top">
        <div className="nav-left">
          <img src="logo-small.png" alt="www-chat" />
        </div>

        <div className="nav-right">
          <Profile />
        </div>
      </div>
      <div className="nav-bottom">
        <div className="slide-toggles-1">
          <div
            className="rooms-toggle-1"
            onClick={() => dispatch(toggleRooms())}
          >
            Rooms {roomsOpen ? "<" : ">"}
          </div>
          <div
            className="users-toggle-1"
            onClick={() => dispatch(toggleUsers())}
          >
            {usersOpen ? ">" : "<"} Users
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
