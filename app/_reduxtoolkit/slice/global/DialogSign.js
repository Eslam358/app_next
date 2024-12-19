import { createSlice } from "@reduxjs/toolkit";

// ----------------------{ Sign in Slice }----------------------------------

const Signin_Slice = createSlice({
  initialState: false,
  name: "Signin_Slice",
  reducers: {
    handleClickOpen: () => {
      return true;
    },
    handleClose_Signin: () => {
      return false;
    },
  },
});
// ----------------------{ Sign up Slice }----------------------------------

const Signup_Slice = createSlice({
  initialState: false,
  name: "Signup_Slice",
  reducers: {
    handle_Open_Signup: () => {
      return true;
    },
    handleClose_Signup: () => {
      return false;
    },
  },
});

export const { handleClickOpen, handleClose_Signin } = Signin_Slice.actions;
export const { handle_Open_Signup, handleClose_Signup } = Signup_Slice.actions;
export const Sign_in = Signin_Slice.reducer;
export const Sign_up = Signup_Slice.reducer;
