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

// Action creators are generated for each case reducer function
export const { toggleSettingsHidden } = settingsSlice.actions;
export const selectSettings = (state) => state.settings;
export default settingsSlice.reducer;
