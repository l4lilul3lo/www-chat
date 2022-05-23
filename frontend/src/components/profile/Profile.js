import ReactCrop from "react-image-crop";
import { useState } from "react";
import { useSelector } from "react-redux";
import "react-image-crop/dist/ReactCrop.css";
import "./profile.css";
import { selectUser } from "../../features/user/userSlice";

const Modal = () => {};
const Profile = () => {
  const [modal, setModal] = useState(false);
  const user = useSelector(selectUser);

  function toggleModal() {
    setModal(!modal);
  }

  return (
    <div className="profile">
      {user ? <h1>{user.name}</h1> : <h1>Anonymous</h1>}
      <img
        src={
          user
            ? user.image
            : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        }
        onClick={toggleModal}
      />
      {modal && (
        <div className="profile-modal">
          <h1 onClick={toggleModal}>X</h1>
          <h1>profile-image</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;
