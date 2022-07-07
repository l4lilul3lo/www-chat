import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggled: false,
};

export const colorPickerToggleSlice = createSlice({
  name: "colorPickerToggle",
  initialState,
  reducers: {
    toggleColorPicker: (state) => {
      state.isToggled = !state.isToggled;
    },
  },
});

export const { toggleColorPicker } = colorPickerToggleSlice.actions;
export const selectColorPickerIsToggled = (state) =>
  state.colorPickerToggle.isToggled;
export default colorPickerToggleSlice.reducer;
