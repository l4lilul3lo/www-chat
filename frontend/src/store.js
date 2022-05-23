import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./features/rooms/roomsSlice";
import usersReducer from "./features/users/usersSlice";
import messagesReducer from "./features/messages/messagesSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    users: usersReducer,
    messages: messagesReducer,
    user: userReducer,
  },
});
