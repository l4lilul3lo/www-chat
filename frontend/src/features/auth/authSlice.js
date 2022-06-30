import { createSlice } from "@reduxjs/toolkit";

const isAuth = localStorage.getItem("isAuth");
const initialState = {
  isAuth: isAuth === "true" ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authorize: (state) => {
      state.isAuth = true;
      localStorage.setItem("isAuth", "true");
    },

    deauthorize: (state) => {
      state.isAuth = false;
      localStorage.setItem("isAuth", "false");
    },
  },
});

export const { authorize, deauthorize } = authSlice.actions;
export const selectIsAuth = (state) => state.auth.isAuth;
export default authSlice.reducer;
