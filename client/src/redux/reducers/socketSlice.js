import { createSlice } from "@reduxjs/toolkit";
const socketSlice = createSlice({
  name: "socket",
  initialState: {
    value: null,
  },
  reducers: {
    setSocket: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
