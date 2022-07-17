import { createSlice } from "@reduxjs/toolkit";
const sidebarSlice = createSlice({
  name: "showSidebar",
  initialState: {
    value: null,
  },
  reducers: {
    setShowSidebar: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setShowSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
