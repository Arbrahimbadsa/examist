import { createSlice } from "@reduxjs/toolkit";
const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isGeneratingQuestion: false,
    isExamSubmitting: false,
  },
  reducers: {
    setIsGeneratingQuestion: (state, action) => {
      state.isGeneratingQuestion = action.payload;
    },
    setIsExamSubmitting: (state, action) => {
      state.isExamSubmitting = action.payload;
    },
  },
});

export const { setIsGeneratingQuestion, setIsExamSubmitting } =
  loadingSlice.actions;
export default loadingSlice.reducer;
