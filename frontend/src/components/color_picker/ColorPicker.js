import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../features/user/userSlice";
import { ChromePicker } from "react-color";
import "./color_picker.css";
const ColorPicker = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [background, setBackground] = useState();
  const [color, setColor] = useState();
  const [selected, setSelected] = useState("color");

  async function handleSave() {
    const response = await fetch("users/updateSettings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        settings: {
          messageColor: color ? color : user.settings.messageColor,
          messageBackground: background
            ? background
            : user.settings.messageBackground,
        },
      }),
    });
    dispatch(
      setUser({
        ...user,
        settings: {
          messageColor: color ? color : user.settings.messageColor,
          messageBackground: background
            ? background
            : user.settings.messageBackground,
        },
      })
    );
  }
  function handleColor(color) {
    setColor(color.hex);
  }

  function handleBackground(color) {
    setBackground(color.hex);
  }

  function determineColor() {
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

    // if user enters a color, color will be that current color.

    // if user changes to background, color will be that background.

    // if user changes background, color will be that current background.
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
            color: color ? color : user.settings.messageColor,
            background: background
              ? background
              : user.settings.messageBackground,
          }}
        >
          example text
        </div>
      </div>

      <ChromePicker color={determineColor()} onChange={handleChange} />
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
        <button>cancel</button>
      </div>
    </div>
  );
};

export default ColorPicker;
