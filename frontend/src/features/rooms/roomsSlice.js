import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRooms } = roomsSlice.actions;
export const selectRooms = (state) => state.rooms.rooms;
export default roomsSlice.reducer;
