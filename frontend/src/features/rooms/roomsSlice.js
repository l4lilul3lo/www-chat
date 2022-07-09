import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  isLoading: true,
};

export const roomsSlice = createSlice({
  name: "roomsState",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    addRoom: (state, action) => {
      state.rooms.push(action.payload);
    },
    setRoomsIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setRooms, addRoom, setRoomsIsLoading } = roomsSlice.actions;
export const selectRoomsState = (state) => state.roomsState;
export default roomsSlice.reducer;
