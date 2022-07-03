import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import "./image_uploader.css";
const ImageUploader = () => {
  const user = useSelector(selectUser);
  const [previewSrc, setPreviewSrc] = useState("");
  const [file, setFile] = useState(null);

  function loadFile(e) {
    console.log("file", e.target.files[0]);
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    const fileExtension = file.type.replace(/(.*)\//g, "");
    const fileName = user.id;
    formData.append("fileName", user.id);
    formData.append("fileExtension", fileExtension);
    formData.append("uploaded-file", file);

    const response = await fetch(
      "https://imagehostingserver.l4lilul3lo.repl.co/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    if (data.message === "success") {
      // await updateUserImage(user.id, )
    }
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
