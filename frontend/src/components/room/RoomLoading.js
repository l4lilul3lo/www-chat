import "./room.css";
const RoomLoading = () => {
  return (
    <div
      className="room-loading"
      style={{
        width: `${Math.floor(Math.random() * (90 - 30) + 30)}%`,
        animationDelay: `${Math.floor(Math.random() * (800 - 150) + 150)}ms`,
      }}
    ></div>
  );
};

export default RoomLoading;
