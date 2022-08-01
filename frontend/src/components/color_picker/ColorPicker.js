import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../features/user/userSlice";
import { ChromePicker } from "react-color";
import { updateServerUserSettings } from "../../api";
import "./color_picker.css";
const ColorPicker = ({ setDisplayColorPicker }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [messageBackground, setMessageBackground] = useState(
    user.settings.messageBackground
  );
  const [messageColor, setMessageColor] = useState(user.settings.messageColor);
  const [selected, setSelected] = useState("messageColor");

  async function handleSave() {
    const settings = { messageColor, messageBackground };

    await updateServerUserSettings(settings);

    const updatedUser = { ...user, settings };
    dispatch(setUser(updatedUser));
    setDisplayColorPicker(false);
  }

  function handleTouchHold() {
    const clickEvent = new Event("touchStart", { bubbles: true });
    window.dispatchEvent(clickEvent);
  }

  useEffect(() => {
    const element = document.querySelector(".hue-horizontal");
    element.addEventListener("mousedown", handleTouchHold);
  }, []);

  function handleChange(color) {
    selected === "messageColor"
      ? setMessageColor(color.hex)
      : setMessageBackground(color.hex);
  }

  return (
    <div className="color-picker">
      <div className="current-message-style">
        <div
          style={{
            color: messageColor,
            background: messageBackground,
          }}
        >
          example text
        </div>
      </div>

      <ChromePicker
        disableAlpha
        color={selected === "messageColor" ? messageColor : messageBackground}
        onChange={handleChange}
        width={"100%"}
      />
      <div className="color-picker-buttons">
        <button
          style={{ background: selected === "messageColor" ? "gray" : "white" }}
          onClick={() => setSelected("messageColor")}
        >
          color
        </button>
        <button
          style={{
            background: selected === "messageBackground" ? "gray" : "white",
          }}
          onClick={() => setSelected("messageBackground")}
        >
          background
        </button>
        <button onClick={handleSave}>save</button>
        <button onClick={() => setDisplayColorPicker(false)}>cancel</button>
      </div>
    </div>
  );
};

export default ColorPicker;
