import "./avatar.css";

const Avatar = ({ url, width, height }) => {
  return (
    <div className="avatar-container" style={{}}>
      <img crossOrigin="anonymous" src={url ? url : "default-avatar.webp"} />
    </div>
  );
};

export default Avatar;
