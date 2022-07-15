import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

export const socketMessageSlice = createSlice({
  name: "socketMessage",
  initialState,
  reducers: {
    setSocketMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setSocketMessage } = socketMessageSlice.actions;
export const selectSocketMessage = (state) => state.socketMessage.message;
export default socketMessageSlice.reducer;
