import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggled: false,
};

export const avatarUploadToggleSlice = createSlice({
  name: "avatarUploadToggle",
  initialState,
  reducers: {
    toggleAvatarUpload: (state) => {
      state.isToggled = !state.isToggled;
    },
  },
});

export const { toggleAvatarUpload } = avatarUploadToggleSlice.actions;
export const selectAvatarUploadIsToggled = (state) =>
  state.avatarUploadToggle.isToggled;
export default avatarUploadToggleSlice.reducer;
