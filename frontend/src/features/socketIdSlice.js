import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socketId: null,
};

export const socketIdSlice = createSlice({
  name: "socketId",
  initialState,
  reducers: {
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
  },
});

export const { setSocketId } = socketIdSlice.actions;
export const selectSocketId = (state) => state.socketId.socketId;
export default socketIdSlice.reducer;
