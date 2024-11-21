import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: undefined,
  token: localStorage.getItem("token") ?? "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    LoginAccount: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      state.info = action.payload.user;
    },
    LogOut: (state) => {
      state.info = undefined;
      state.token = "";
      localStorage.removeItem("token");
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
});

export const { reducer: accountReducer, actions } = accountSlice;
