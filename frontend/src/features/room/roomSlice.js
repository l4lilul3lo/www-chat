import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: {
    name: "",
    id: "",
  },
  pendingRoomId: "",
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.room = action.payload;
    },
    setPendingRoomId: (state, action) => {
      state.pendingRoomId = action.payload;
    },
  },
});

export const { setRoom, setPendingRoomId } = roomSlice.actions;
export const selectRoom = (state) => state.room.room;
export const selectPendingRoomId = (state) => state.room.pendingRoomId;
export default roomSlice.reducer;
