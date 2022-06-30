import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: {
    name: "",
    id: "",
  },
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.room = action.payload;
      localStorage.setItem("storedRoom", action.payload);
    },
  },
});

export const { setRoom } = roomSlice.actions;
export const selectRoom = (state) => state.room.room;
export default roomSlice.reducer;
