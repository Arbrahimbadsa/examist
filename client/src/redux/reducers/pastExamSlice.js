import { createSlice } from "@reduxjs/toolkit";
import { pastExams } from "../../utils/pastExams";
const pastExamSlice = createSlice({
  name: "pastExams",
  initialState: {
    value: pastExams.exams,
  },
  reducers: {
    setPastExams: (state, action) => {
      state.value.pastExams = [...state.value.pastExams, action.payload];
    },
  },
});
export const { setPastExams } = pastExamSlice.actions;
export default pastExamSlice.reducer;
