import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";

import "./image_uploader.css";
const ImageUploader = ({ displayImageUploader, setDisplayImageUploader }) => {
  const user = useSelector(selectUser);
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState(null);
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  console.log("previewsrc", previewImage?.height);
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
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);
    image.src = objectUrl;
    image.onload = () => {
      setWidth(image.width);
      setHeight(image.height);
    };
    setPreviewImage(image);

    return () => {
      console.log("fired");
      URL.revokeObjectURL(objectUrl);
      // setFile(null);
    };
  }, [file]);
  console.log("height", height);
  console.log("width", width);

  return (
    <div className="image-upload-container">
      <div className="preview-container">
        <img
          className="preview"
          src={previewImage.src ? previewImage.src : "image-upload.png"}
          style={{
            height: `${height > width ? "auto" : "100%"}`,
            width: `${height > width ? "100%" : "auto"}`,
          }}
        />
      </div>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        name="uploaded-file"
        onChange={loadFile}
      />

      <div className="confirm-cancel">
        <button onClick={handleSubmit}>Confirm</button>
        <button onClick={() => setDisplayImageUploader(!displayImageUploader)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
