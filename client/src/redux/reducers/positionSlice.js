import { createSlice } from "@reduxjs/toolkit";
const positionSlice = createSlice({
  name: "position",
  initialState: {
    value: {
      scrollTop: 0,
    },
  },
  reducers: {
    setScrollTop: (state, action) => {
      state.value = {
        ...state.value,
        scrollTop: action.payload,
      };
    },
  },
});

export const { setScrollTop } = positionSlice.actions;
export default positionSlice.reducer;
