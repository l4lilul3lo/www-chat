import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: {
    name: "cafe",
    id: "df6cfeeb-59e1-4f48-9534-5bcb57e4d573",
  },
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.room = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRoom } = roomSlice.actions;
export const selectRoom = (state) => state.room.room;
export default roomSlice.reducer;
