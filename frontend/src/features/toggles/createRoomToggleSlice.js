import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggled: false,
};

export const createRoomToggleSlice = createSlice({
  name: "createRoomToggle",
  initialState,
  reducers: {
    toggleCreateRoom: (state) => {
      state.isToggled = !state.isToggled;
    },
  },
});

export const { toggleCreateRoom } = createRoomToggleSlice.actions;
export const selectCreateRoomIsToggled = (state) =>
  state.createRoomToggle.isToggled;
export default createRoomToggleSlice.reducer;
