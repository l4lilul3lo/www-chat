import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../features/user/userSlice";
import {
  selectAvatarUploadIsToggled,
  toggleAvatarUpload,
} from "../../features/toggles/avatarUploadToggleSlice";

import "./image_uploader.css";
const ImageUploader = () => {
  const user = useSelector(selectUser);
  const avatarUploadIsToggled = useSelector(selectAvatarUploadIsToggled);
  const dispatch = useDispatch();
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
    await fetch("users/updateUserImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });
    // refresh cache
    await fetch(imageUrl);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
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

        const newObj = {
          ...user,
          image: `https://imagehostingserver.l4lilul3lo.repl.co/images/${fileName}.webp`,
        };
        console.log("user is newObj", user === newObj);
        dispatch(setUser(newObj));
      }
      console.log("image post response", data);
    } catch (error) {
      console.log(error);
    }
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

  if (!avatarUploadIsToggled) {
    return null;
  }

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
        accept="image/png, image/jpeg, image/jpg"
        name="uploaded-file"
        onChange={loadFile}
      />

      <div className="confirm-cancel">
        <button onClick={handleSubmit}>Confirm</button>
        <button onClick={() => dispatch(toggleAvatarUpload())}>Cancel</button>
      </div>
    </div>
  );
};

export default ImageUploader;
