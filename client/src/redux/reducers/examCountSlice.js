import { createSlice } from "@reduxjs/toolkit";

export const examCountSlice = createSlice({
  name: "counter",
  initialState: {
    prefix: "",
    quickExamCount: 0,
    customExamCount: 0,
  },
  reducers: {
    setQuickExamCount: (state) => {
      state.quickExamCount = state.quickExamCount + 1;
    },
    setCustomExamCount: (state) => {
      state.customExamCount = state.customExamCount + 1;
    },
    setExamPrefix: (state, action) => {
      state.prefix = action.payload;
    },
    setQuickExamCountD: (state) => {
      state.quickExamCount = state.quickExamCount - 1;
    },
    setCustomExamCountD: (state) => {
      state.customExamCount = state.customExamCount - 1;
    },
  },
});

export const {
  setCustomExamCount,
  setQuickExamCount,
  setExamPrefix,
  setQuickExamCountD,
  setCustomExamCountD,
} = examCountSlice.actions;

export default examCountSlice.reducer;
