import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slideState: "",
};

export const usersSlideSlice = createSlice({
  name: "usersSlide",
  initialState,
  reducers: {
    toggleUsersSlideState: (state, action) => {
      if (state.slideState === "") {
        state.slideState = "slide-in-right";
        return;
      }

      state.slideState =
        state.slideState === "slide-out-right"
          ? "slide-in-right"
          : "slide-out-right";
    },
  },
});

export const { toggleUsersSlideState } = usersSlideSlice.actions;
export const selectUsersSlideState = (state) => state.usersSlide.slideState;
export default usersSlideSlice.reducer;
