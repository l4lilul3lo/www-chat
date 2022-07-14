import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  repeater: false,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const newArr = [...state.notifications];
      newArr.push(action.payload);
      state.notifications = newArr;
    },
    removeNotification: (state) => {
      const newArr = [...state.notifications].slice(
        1,
        state.notifications.length
      );
      state.notifications = newArr;
    },
    repeatAnimation: (state) => {
      state.repeater = !state.repeater;
    },
  },
});

export const { addNotification, removeNotification, repeatAnimation } =
  notificationsSlice.actions;
export const selectNotifications = (state) => state.notifications.notifications;
export const selectRepeatAnimation = (state) => state.notifications.repeater;
export default notificationsSlice.reducer;

// onAnimationComplete={onComplete}
