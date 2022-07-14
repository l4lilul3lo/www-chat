import RoomsSlide from "./RoomsSlide";
import UsersSlide from "./UsersSlide";
const SmallScreen = ({
  handleRoomsToggle,
  handleUsersToggle,
  roomsOpen,
  usersOpen,
}) => {
  return (
    <div className="small-screen">
      <div className="slide-toggles">
        <div className="rooms-toggle" onClick={handleRoomsToggle}>
          Rooms {roomsOpen ? "<" : ">"}
        </div>
        <div className="users-toggle" onClick={handleUsersToggle}>
          {usersOpen ? ">" : "<"} Users
        </div>
      </div>
      <RoomsSlide isVisible={roomsOpen} />
      <UsersSlide isVisible={usersOpen} />
    </div>
  );
};

export default SmallScreen;
