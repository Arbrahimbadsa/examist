import { createSlice } from "@reduxjs/toolkit";
const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isGeneratingQuestion: false,
    isExamSubmitting: false,
    areYouSure: false,
  },
  reducers: {
    setIsGeneratingQuestion: (state, action) => {
      state.isGeneratingQuestion = action.payload;
    },
    setIsExamSubmitting: (state, action) => {
      state.isExamSubmitting = action.payload;
    },
    setAreYouSure: (state, action) => {
      state.areYouSure = action.payload;
    },
  },
});

export const { setIsGeneratingQuestion, setIsExamSubmitting, setAreYouSure } =
  loadingSlice.actions;
export default loadingSlice.reducer;
