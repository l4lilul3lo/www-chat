// import { createSlice } from "@reduxjs/toolkit";
// import { io } from "socket.io-client";

// const initialState = {
//   socket: {},
// };

// export const socketSlice = createSlice({
//   name: "socket",
//   initialState,
//   reducers: {
//     sendMessage: (state, action) => {
//       console.log("sending in reducer");
//       console.log("message", action.payload);
//       state.socket.emit("message", action.payload);
//     },
//     setSocket: (state, action) => {
//       state.socket = action.payload;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { sendMessage, setSocket } = socketSlice.actions;
// export default socketSlice.reducer;
