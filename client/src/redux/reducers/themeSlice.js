import { createSlice } from "@reduxjs/toolkit";
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: "light",
  },
  reducers: {
    switchTheme: (state) => {
      if (localStorage) {
        const mode = localStorage.getItem("themeMode");
        if (mode) {
          localStorage.removeItem("themeMode");
          if (mode === "light") {
            localStorage.setItem("themeMode", "dark");
            state.value = "dark";
          } else {
            localStorage.setItem("themeMode", "light");
            state.value = "light";
          }
        } else {
          if (state.value === "light") {
            localStorage.setItem("themeMode", "dark");
            state.value = "dark";
          } else {
            localStorage.setItem("themeMode", "light");
            state.value = "light";
          }
        }
      }
    },
    updateTheme: (state) => {
      if (localStorage) {
        const mode = localStorage.getItem("themeMode");
        state.value = mode;
      } else {
        state.value = "light";
      }
    },
  },
});

export const { switchTheme, updateTheme } = themeSlice.actions;
export default themeSlice.reducer;
