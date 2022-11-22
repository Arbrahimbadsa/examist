import { createSlice } from "@reduxjs/toolkit";
const dashboardQuestionSlice = createSlice({
  name: "dashboardQuestion",
  initialState: {
    value: {
      label: "Loading...",
      options: [],
      correctIndex: null,
      selectedIndex: null,
      touched: false,
      subject: null,
      chapter: null,
    },
  },
  reducers: {
    setDashboardQuestion: (state, action) => {
      state.value = action.payload;
    },
    setDashboardQuestionOption: (state, action) => {
      state.value = {
        ...state.value,
        selectedIndex: action.payload,
        touched: true,
      };
    },
  },
});
export const { setDashboardQuestion, setDashboardQuestionOption } =
  dashboardQuestionSlice.actions;
export default dashboardQuestionSlice.reducer;
