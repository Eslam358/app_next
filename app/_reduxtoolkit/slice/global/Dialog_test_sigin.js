import { createSlice } from "@reduxjs/toolkit";

// ----------------------{ Sign in Slice }----------------------------------

const Dialog_test = createSlice({
  initialState: false,
  name: "Dialog_test",
  reducers: {
  Open_Dialog_test: () => {
      return true;
    },
   Close_Dialog_test: () => {
      return false;
    },
  },
});


export const { Open_Dialog_test, Close_Dialog_test } = Dialog_test.actions;
export default  Dialog_test.reducer;

