import { createSlice } from "@reduxjs/toolkit";
const disableContentSlice = createSlice({
  name: "disableContent",
  initialState: {
    value: false,
  },
  reducers: {
    disableContent: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { disableContent } = disableContentSlice.actions;
export default disableContentSlice.reducer;
