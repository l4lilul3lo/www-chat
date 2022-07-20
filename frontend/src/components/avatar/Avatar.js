import "./avatar.css";
import React from "react";

const Avatar = ({ url, width, height }) => {
  return (
    <div className="avatar-container" style={{}}>
      <img src={url ? url : "default-avatar.webp"} />
    </div>
  );
};

export default Avatar;
