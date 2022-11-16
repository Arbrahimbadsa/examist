import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      name: "",
      username: "",
      id: "",
      image: "",
      auth: false,
    },
  },
  reducers: {
    updateUser: (state) => {
      if (localStorage) {
        const userData = localStorage.getItem("user");
        state.value = JSON.parse(userData);
      } else {
        state.value = {
          ...state.value,
        };
      }
    },
    setUser: (state, action) => {
      if (localStorage) {
        const userData = localStorage.getItem("user");
        if (userData) {
          state.value = JSON.parse(userData);
        } else {
          localStorage.setItem("user", JSON.stringify(action.payload));
          state.value = action.payload;
        }
      } else {
        state.value = action.payload;
      }
    },
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("contentIndex");
      state.value = null;
    },
  },
});

export const { setUser, updateUser, logout } = userSlice.actions;
export default userSlice.reducer;
