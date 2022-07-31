import RoomsSlide from "./RoomsSlide";
import UsersSlide from "./UsersSlide";
const SmallScreen = ({ roomsOpen, usersOpen }) => {
  return (
    <div className="small-screen">
      <RoomsSlide isVisible={roomsOpen} />
      <UsersSlide isVisible={usersOpen} />
    </div>
  );
};

export default SmallScreen;
