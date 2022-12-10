import { createSlice } from "@reduxjs/toolkit";
const sidebarSlice = createSlice({
  name: "showSidebar",
  initialState: {
    value: null,
    pcSidebar: true,
  },
  reducers: {
    setShowSidebar: (state, action) => {
      state.value = action.payload;
    },
    setPcSidebar: (state, action) => {
      state.pcSidebar = action.payload;
    },
  },
});
export const { setShowSidebar, setPcSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
