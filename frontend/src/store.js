import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./features/rooms/roomsSlice";
import usersReducer from "./features/users/usersSlice";
import messagesReducer from "./features/messages/messagesSlice";
import userReducer from "./features/user/userSlice";
import authReducer from "./features/auth/authSlice";
import roomReducer from "./features/room/roomSlice";
import settingsReducer from "./features/settings/settingsSlice";
import avatarUploadToggleReducer from "./features/toggles/avatarUploadToggleSlice";
import colorPickerToggleReducer from "./features/toggles/colorPickerToggleSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    room: roomReducer,
    users: usersReducer,
    user: userReducer,
    messages: messagesReducer,
    auth: authReducer,
    settings: settingsReducer,
    avatarUploadToggle: avatarUploadToggleReducer,
    colorPickerToggle: colorPickerToggleReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
