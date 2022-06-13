import "./createRoom.css";
const CreateRoom = () => {
  return (
    <div className="create-room-container">
      <form>
        <label for="room-name">Room Name</label>
        <input type="text" />
        <label for="room-password">Password</label>
        <input type="password" autoComplete="on" />
        <input type="submit" value="create room" />
      </form>
    </div>
  );
};

export default CreateRoom;
