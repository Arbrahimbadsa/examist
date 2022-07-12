import { createSlice } from "@reduxjs/toolkit";
const contentIndexSlice = createSlice({
  name: "contentIndex",
  initialState: {
    value: 0,
  },
  reducers: {
    setContentIndex: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setContentIndex } = contentIndexSlice.actions;
export default contentIndexSlice.reducer;
