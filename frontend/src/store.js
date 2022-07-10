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
import roomsSlideReducer from "./features/toggles/roomsSlideSlice";
import usersSlideReducer from "./features/toggles/usersSlideSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    roomsState: roomsReducer,
    room: roomReducer,
    users: usersReducer,
    user: userReducer,
    messagesState: messagesReducer,
    auth: authReducer,
    settings: settingsReducer,
    avatarUploadToggle: avatarUploadToggleReducer,
    colorPickerToggle: colorPickerToggleReducer,
    roomsSlide: roomsSlideReducer,
    usersSlide: usersSlideReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
