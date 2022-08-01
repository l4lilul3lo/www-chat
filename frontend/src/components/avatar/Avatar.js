import "./avatar.css";

const Avatar = ({ url }) => {
  return (
    <div className="avatar-container">
      <img
        crossOrigin="anonymous"
        src={url ? url : "default-avatar.webp"}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
