import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hidden: true,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleSettingsHidden: (state) => {
      state.hidden = !state.hidden;
    },
  },
});

export const { toggleSettingsHidden } = settingsSlice.actions;
export const selectSettings = (state) => state.settings;
export default settingsSlice.reducer;
