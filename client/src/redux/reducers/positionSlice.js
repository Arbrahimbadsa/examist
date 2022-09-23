import { createSlice } from "@reduxjs/toolkit";
const positionSlice = createSlice({
  name: "position",
  initialState: {
    value: {
      scrollTop: 0,
    },
    container: null,
  },
  reducers: {
    setScrollTop: (state, action) => {
      state.value = {
        ...state.value,
        scrollTop: action.payload,
      };
    },
    setContainer: (state, action) => {
      state.container = action.payload;
    },
  },
});

export const { setScrollTop, setContainer } = positionSlice.actions;
export default positionSlice.reducer;
