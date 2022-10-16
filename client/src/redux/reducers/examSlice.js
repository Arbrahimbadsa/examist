import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const examSlice = createSlice({
  name: "exam",
  initialState: {
    examId: "",
    totalQuestions: "",
    examTime: "",
    isNegAllowed: false,
    subjects: [],
    chapters: [],
    questions: [],
  },
  reducers: {
    setQuestions: (state, action) => {
      window.answerSheet = action.payload;
      state.questions = action.payload;
    },
    setExamId: (state, action) => {
      state.examId = action.payload;
    },
    setExamTime: (state, action) => {
      state.examTime = action.payload;
    },
    setTotalQuestions: (state, action) => {
      state.totalQuestions = action.payload;
    },
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    setChapters: (state, action) => {
      state.chapters = action.payload;
    },
    setIsNegAllowed: (state, action) => {
      state.isNegAllowed = action.payload;
    },
    clearNewExamInputs: (state) => {
      state.examId = "";
      state.totalQuestions = "";
      state.examTime = "";
      state.subjects = [];
      state.chapters = [];
      state.questions = [];
    },
    setSelectedIndex: (state, action) => {
      const question = action.payload.question;
      const index = action.payload.index;
      const questions = action.payload.questions;
      question.setSelectedIndex(index);
      question.isTouched();
      if (question.selectedIndex.length > 1) question.isDoubleAnswered();
      window.answerSheet = questions;
    },
  },
});

export const {
  setQuestions,
  setSelectedIndex,
  setExamTime,
  setTotalQuestions,
  setSubjects,
  setChapters,
  setIsNegAllowed,
  clearNewExamInputs,
  setExamId,
} = examSlice.actions;
export default examSlice.reducer;
