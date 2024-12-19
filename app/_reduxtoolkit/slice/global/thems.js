import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: localStorage.getItem("mode") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode', state.mode);  // حفظ الحالة في localStorage
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem('mode', state.mode);  // حفظ الحالة في localStorage
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
