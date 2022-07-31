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
import roomClickedReducer from "./features/toggles/roomClickedSlice";
import togglesReducer from "./features/toggles/togglesSlice";
import notificationsReducer from "./features/notifications/notificationsSlice";
import socketMessageReducer from "./features/socket_messages/socketMessageSlice";
import createRoomToggleReducer from "./features/toggles/createRoomToggleSlice";

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
    createRoomToggle: createRoomToggleReducer,
    colorPickerToggle: colorPickerToggleReducer,
    roomClicked: roomClickedReducer,
    toggles: togglesReducer,
    notifications: notificationsReducer,
    socketMessage: socketMessageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
