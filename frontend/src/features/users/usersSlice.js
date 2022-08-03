import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      const toRemove = action.payload;
      const newUsers = state.users.filter((user) => user.id !== toRemove.id);
      state.users = newUsers;
    },
  },
});

export const { setUsers, addUser, removeUser } = usersSlice.actions;
export const selectUsers = (state) => state.users.users;
export default usersSlice.reducer;
