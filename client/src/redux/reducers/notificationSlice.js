import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
  name: "socket",
  initialState: {
    values: [],
    isNewFound: false,
  },
  reducers: {
    addNotification: (state, action) => {
      state.values = [...state.values, action.payload];
    },
    setIsNewNotiFound: (state, action) => {
      state.isNewFound = action.payload;
    },
  },
});
export const { addNotification, setIsNewNotiFound } = notificationSlice.actions;
export default notificationSlice.reducer;
