import "./avatar.css";

const Avatar = ({ url, width, height }) => {
  return (
    <div
      className="avatar-container"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <img src={url ? url : "default-avatar.webp"} />
    </div>
  );
};

export default Avatar;
