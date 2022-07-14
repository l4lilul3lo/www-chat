import { createSlice } from "@reduxjs/toolkit";

function setOneTrue(key, state, initialState) {
  const notCurrent = !state.toggles[key];
  return { ...initialState.toggles, [key]: notCurrent };
}

const initialState = {
  toggles: {
    roomsOpen: false,
    usersOpen: false,
    settingsOpen: false,
  },
};

export const togglesSlice = createSlice({
  name: "toggles",
  initialState,
  reducers: {
    toggleRooms: (state) => {
      state.toggles = setOneTrue("roomsOpen", state, initialState);
    },
    toggleUsers: (state) => {
      state.toggles = setOneTrue("usersOpen", state, initialState);
    },
    toggleSettings: (state) => {
      state.toggles = setOneTrue("settingsOpen", state, initialState);
    },
    closeAll: (state) => {
      state.toggles = initialState.toggles;
    },
  },
});

export const { toggleRooms, toggleUsers, toggleSettings, closeAll } =
  togglesSlice.actions;
export const selectToggles = (state) => state.toggles.toggles;
export default togglesSlice.reducer;
