import { createSlice } from "@reduxjs/toolkit";

const Snackbars = createSlice({
  initialState: { open: false, massage: "", severity: "success" },
  name: "Snackbars",
  reducers: {
    Snackbar_massage_success: (state, action) => {
      return state = { open: true, massage: action.payload, severity: "success" };
    },
    Snackbar_massage_error: (state, action) => {
      return state = { open: true, massage: action.payload, severity: "error" };
    },
    Snackbar_Close: () => {
      return  { open: false, massage: "", severity: "success" };
    },
  },
});

export const {
  Snackbar_massage_success,
  Snackbar_massage_error,
  Snackbar_Close,
} = Snackbars.actions;
export default Snackbars.reducer;
