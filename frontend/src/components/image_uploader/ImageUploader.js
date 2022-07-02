import { useState } from "react";
import "./image_uploader.css";
const ImageUploader = () => {
  const [previewSrc, setPreviewSrc] = useState("");
  const [file, setFile] = useState(null);

  function loadFile(e) {
    setFile(e.target.files[0]);
    setPreviewSrc(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <form className="image-upload-form">
      <label for="image-upload" className="custom-image-upload"></label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onchange={loadFile}
      />
      <img id="output" src={previewSrc} />
    </form>
  );
};

export default ImageUploader;
