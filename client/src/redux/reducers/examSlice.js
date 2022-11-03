import { createSlice } from "@reduxjs/toolkit";
const examSlice = createSlice({
  name: "exam",
  initialState: {
    examId: "",
    totalQuestions: "",
    examTime: "",
    isNegAllowed: false,
    showExamPage: true,
    onlyResult: false,
    isCompleted: false,
    subjects: [],
    chapters: [],
    questions: [],
    answerSheet: [],
    marks: null,
    name: "",
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
    setShowExamPage: (state, action) => {
      state.showExamPage = action.payload;
    },
    setOnlyResult: (state, action) => {
      state.onlyResult = action.payload;
    },
    setIsCompleted: (state, action) => {
      state.isCompleted = action.payload;
    },
    setAnswerSheet: (state, action) => {
      state.answerSheet = action.payload;
    },
    setMarks: (state, action) => {
      state.marks = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    clearNewExamInputs: (state) => {
      state.examId = "";
      state.totalQuestions = "";
      state.examTime = "";
      state.subjects = [];
      state.chapters = [];
      state.questions = [];
      state.answerSheet = [];
      state.onlyResult = false;
      state.showExamPage = true;
      state.isCompleted = false;
      state.marks = null;
      state.name = "";
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
  setShowExamPage,
  setOnlyResult,
  setAnswerSheet,
  setMarks,
  setName,
  setIsCompleted,
} = examSlice.actions;
export default examSlice.reducer;
