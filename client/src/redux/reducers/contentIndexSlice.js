import { createSlice } from "@reduxjs/toolkit";
const contentIndexSlice = createSlice({
  name: "contentIndex",
  initialState: {
    value: 0,
  },
  reducers: {
    setContentIndex: (state, action) => {
      localStorage.setItem("contentIndex", action.payload);
      state.value = action.payload;
    },
    updateContentIndex: (state) => {
      const index = localStorage.getItem("contentIndex");
      if (index) {
        state.value = +index;
      } else {
        state.value = 0;
      }
    },
  },
});
export const { setContentIndex, updateContentIndex } =
  contentIndexSlice.actions;
export default contentIndexSlice.reducer;
