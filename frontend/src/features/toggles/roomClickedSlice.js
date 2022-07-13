import { createSlice } from "@reduxjs/toolkit";
// We just change back and forth to always accomplish the same thing. Close overlay roomsSlide when a room is clicked.
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
