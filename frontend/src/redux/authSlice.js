import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      success: false,
      isFetching: false,
      error: false,
    },
    // logout: {
    //   isFetching: false,
    //   error: false,
    // },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginError: (state) => {
      state.login.isFetching = false;

      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    registerError: (state) => {
      state.register.isFetching = false;
      state.register.success = false;

      state.register.error = true;
    },

    logOutStart: (state) => {
      state.login.isFetching = true;
    },
    logOutSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
    },
    logOutError: (state) => {
      state.login.isFetching = false;

      state.login.error = true;
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginError,
  registerStart,
  registerSuccess,
  registerError,
  logOutStart,
  logOutSuccess,
  logOutError,
} = authSlice.actions;

export default authSlice.reducer;
