import { createSlice } from "@reduxjs/toolkit";
const examSlice = createSlice({
  name: "exam",
  initialState: {
    value: {
      questions: [],
    },
  },
  reducers: {
    setQuestions: (state, action) => {
      window.answerSheet = action.payload;
      state.value = {
        ...state.value,
        questions: action.payload,
      };
    },
    setSelectedIndex: (state, action) => {
      const question = action.payload.question;
      const index = action.payload.index;
      const questions = action.payload.questions;
      question.setSelectedIndex(index);
      question.isTouched();
      if (question.selectedIndex.length > 1) question.isDoubleAnswered();
      // if (!question.touched) {
      //   question.setSelectedIndex(index);
      //   question.isTouched();
      // } else {
      //   question.isDoubleAnswered();
      // }
      window.answerSheet = questions;
    },
  },
});

export const { setQuestions, setSelectedIndex } = examSlice.actions;
export default examSlice.reducer;
