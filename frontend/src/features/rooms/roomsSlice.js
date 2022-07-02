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
    addRoom: (state, action) => {
      state.rooms.push(action.payload);
    },
  },
});

export const { setRooms, addRoom } = roomsSlice.actions;
export const selectRooms = (state) => state.rooms.rooms;
export default roomsSlice.reducer;
