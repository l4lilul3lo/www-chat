import { useState, useEffect } from "react";
import "./image_uploader.css";
const ImageUploader = () => {
  const [previewSrc, setPreviewSrc] = useState("");
  const [file, setFile] = useState(null);

  function loadFile(e) {
    console.log("file", e.target.files[0]);
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("hello", "goodbye");
    formData.append("uploaded-file", file);

    const response = await fetch(
      "https://imagehostingserver.l4lilul3lo.repl.co/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log("image post response", data);
  }

  useEffect(() => {
    if (!file) {
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewSrc(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  return (
    <form className="image-upload-form">
      <label for="image-upload" className="custom-image-upload">
        <span className="material-symbols-outlined image-upload-icon-large">
          add_photo_alternate
        </span>
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        name="uploaded-file"
        onChange={loadFile}
      />
      <div className="preview">
        <img id="output" src={previewSrc} />
        <button onClick={handleSubmit}>Confirm</button>
      </div>
    </form>
  );
};

export default ImageUploader;
