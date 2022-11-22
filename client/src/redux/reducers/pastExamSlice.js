import { createSlice } from "@reduxjs/toolkit";
const pastExamSlice = createSlice({
  name: "pastExams",
  initialState: {
    value: [],
  },
  reducers: {
    setPastExams: (state, action) => {
      state.value = action.payload;
    },
    removePastExam: (state, action) => {
      const newPastExams = state.value;
      newPastExams.forEach((exam, i) => {
        if (exam._id === action.payload) newPastExams.splice(i, 1);
      });
      state.value = newPastExams;
    },
  },
});
export const { setPastExams, removePastExam } = pastExamSlice.actions;
export default pastExamSlice.reducer;
