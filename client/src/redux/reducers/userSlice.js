import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      name: "Arb",
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
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
