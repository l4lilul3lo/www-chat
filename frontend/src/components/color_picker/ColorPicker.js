import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../features/user/userSlice";
import { ChromePicker } from "react-color";
import { updateUserSettings } from "../../api";
import "./color_picker.css";
const ColorPicker = ({ setDisplayColorPicker }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [background, setBackground] = useState();
  const [color, setColor] = useState();
  const [selected, setSelected] = useState("color");
  function handleTouchHold() {
    const clickEvent = new Event("touchStart", { bubbles: true });
    window.dispatchEvent(clickEvent);
  }

  async function handleSave() {
    const settings = {
      messageColor: determineColor(),
      messageBackground: determineBackground(),
    };
    await updateUserSettings(settings);
    dispatch(
      setUser({
        ...user,
        settings: {
          messageColor: determineColor(),
          messageBackground: determineBackground(),
        },
      })
    );
  }

  useEffect(() => {
    const element = document.querySelector(".hue-horizontal");
    element.addEventListener("mousedown", handleTouchHold);
  }, []);

  function determineColor() {
    return color ? color : user.settings.messageColor;
  }

  function determineBackground() {
    return background ? background : user.settings.messageBackground;
  }

  function determinePickerColor() {
    if (selected === "color") {
      if (!color) {
        return user.settings.messageColor;
      }
      return color;
    }

    if (selected === "background") {
      if (!background) {
        return user.settings.messageBackground;
      }
      return background;
    }
  }

  function handleChange(color) {
    if (selected === "color") {
      setColor(color.hex);
    } else {
      setBackground(color.hex);
    }
  }

  return (
    <div className="color-picker">
      <div className="current-message-style">
        <div
          style={{
            color: determineColor(),
            background: determineBackground(),
          }}
        >
          example text
        </div>
      </div>

      <ChromePicker
        disableAlpha
        color={determinePickerColor()}
        onChange={handleChange}
        width={"100%"}
      />
      <div className="color-picker-buttons">
        <button
          style={{ background: selected === "color" ? "gray" : "white" }}
          onClick={() => setSelected("color")}
        >
          color
        </button>
        <button
          style={{ background: selected === "background" ? "gray" : "white" }}
          onClick={() => setSelected("background")}
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
