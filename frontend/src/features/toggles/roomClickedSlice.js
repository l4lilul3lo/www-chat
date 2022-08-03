import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomClicked: null,
};

export const roomClickedSlice = createSlice({
  name: "roomClicked",
  initialState,
  reducers: {
    closeRoomsSlide: (state) => {
      if (state.roomClicked === null) {
        state.roomClicked = state.roomClicked = true;
        return;
      }
      state.roomClicked = !state.roomClicked;
    },
  },
});

export const { closeRoomsSlide } = roomClickedSlice.actions;
export const selectRoomClicked = (state) => state.roomClicked.roomClicked;
export default roomClickedSlice.reducer;
