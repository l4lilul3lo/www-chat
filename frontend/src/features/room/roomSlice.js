import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: {
    name: "",
    id: "",
  },
  pendingRoom: {
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
      localStorage.setItem("storedRoom", JSON.stringify(action.payload));
    },
    setPendingRoom: (state, action) => {
      state.pendingRoom = action.payload;
    },
  },
});

export const { setRoom, setPendingRoom } = roomSlice.actions;
export const selectRoom = (state) => state.room.room;
export const selectPendingRoom = (state) => state.room.pendingRoom;
export default roomSlice.reducer;
