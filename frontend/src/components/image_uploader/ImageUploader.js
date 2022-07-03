import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import "./image_uploader.css";
const ImageUploader = () => {
  const user = useSelector(selectUser);
  const [previewSrc, setPreviewSrc] = useState("");
  const [file, setFile] = useState(null);
  console.log("previewsrc", previewSrc);
  console.log("file", file);

  function loadFile(e) {
    console.log("file", e.target.files[0]);
    setFile(e.target.files[0]);
  }

  async function updateUserImage(imageUrl) {
    const response = await fetch("users/updateUserImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    const fileExtension = file.type.replace(/(.*)\//g, "");
    const fileName = user.id;
    formData.append("fileName", fileName);
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
      // update in database
      await updateUserImage(
        `https://imagehostingserver.l4lilul3lo.repl.co/images/${fileName}.webp`
      );
    }
    console.log("image post response", data);
  }

  useEffect(() => {
    if (!file) {
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewSrc(objectUrl);

    return () => {
      console.log("fired");
      URL.revokeObjectURL(objectUrl);
      // setFile(null);
    };
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
