import { createSlice } from "@reduxjs/toolkit";
import deleteCookie from "../../utils/deleteCookie";
import getCookie from "../../utils/getCookie";
import setCookie from "../../utils/setCookie";
const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      name: "Test name",
      username: null,
      id: "test-id",
      image: "....",
      auth: true,
    },
  },
  reducers: {
    updateUser: (state) => {
      const userData = getCookie("user");
      state.value = userData;
    },
    setUser: (state, action) => {
      const userData = getCookie("user");
      if (userData) {
        state.value = userData;
      } else {
        setCookie("user", action.payload);
        state.value = action.payload;
      }
    },
    logout: (state) => {
      deleteCookie("user");
      localStorage.removeItem("contentIndex");
      state.value = null;
    },
  },
});

export const { setUser, updateUser, logout } = userSlice.actions;
export default userSlice.reducer;
