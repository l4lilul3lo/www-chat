import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slideState: "",
};

export const roomsSlideSlice = createSlice({
  name: "roomsSlide",
  initialState,
  reducers: {
    toggleRoomsSlideState: (state, action) => {
      if (state.slideState === "") {
        state.slideState = "slide-in-left";
        return;
      }

      state.slideState =
        state.slideState === "slide-out-left"
          ? "slide-in-left"
          : "slide-out-left";
    },
  },
});

export const { toggleRoomsSlideState } = roomsSlideSlice.actions;
export const selectRoomsSlideState = (state) => state.roomsSlide.slideState;
export default roomsSlideSlice.reducer;
