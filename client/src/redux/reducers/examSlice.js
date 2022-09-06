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
      state.value = {
        ...state.value,
        questions: action.payload,
      };
    },
    setSelectedIndex: (state, action) => {
      const question = action.payload.question;
      const index = action.payload.index;
      const questions = action.payload.questions;
      if (!question.touched) {
        question.setSelectedIndex(index);
        question.isTouched();
      } else {
        question.isDoubleAnswered();
      }
      window.answerSheet = questions;
    },
  },
});

export const { setQuestions, setSelectedIndex } = examSlice.actions;
export default examSlice.reducer;
