import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../features/user/userSlice";
import ClipLoader from "react-spinners/ClipLoader";
import "./image_uploader.css";

const ImageUploader = ({ handleToggleAvatarUpload }) => {
  const lastFileName = useRef(null);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState(null);
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [loading, setLoading] = useState(false);

  function loadFile(e) {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      lastFileName.current = e.target.files[0].name;
    }
  }

  async function updateUserImage(imageUrl) {
    await fetch("http://localhost:9000/users/updateUserImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ imageUrl }),
    });
    // refresh cache
    await fetch(imageUrl);
  }

  function cancelSelection() {
    console.log("cancel selection");
    setFile(false);
    setPreviewImage("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!file?.type) {
        return;
      }
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

        dispatch(setUser(newObj));
        handleToggleAvatarUpload();
      }
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
      URL.revokeObjectURL(objectUrl);
      // setFile(null);
    };
  }, [file]);

  // if (loading) {
  //   return (
  //     <ClipLoader
  //       cssOverride={{ position: "absolute", top: "10px", left: "10px" }}
  //     />
  //   );
  // }

  return (
    <div className="image-upload-container">
      <div className={loading ? "image-uploader-loading" : "image-uploader"}>
        <div className="preview-container">
          {loading ? (
            <ClipLoader />
          ) : (
            <img
              className="preview"
              src={previewImage.src ? previewImage.src : "image-upload.png"}
              style={{
                height: `${height > width ? "auto" : "100%"}`,
                width: `${height > width ? "100%" : "auto"}`,
              }}
            />
          )}
        </div>
        <input
          className="file-upload"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          name="uploaded-file"
          title="hahaha"
          onChange={loadFile}
        />

        <div className="confirm-cancel">
          <button className="confirm" onClick={handleSubmit}>
            Confirm
          </button>
          <button className="cancel" onClick={handleToggleAvatarUpload}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
