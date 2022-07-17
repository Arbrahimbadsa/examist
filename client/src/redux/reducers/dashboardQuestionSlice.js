import { createSlice } from "@reduxjs/toolkit";
const dashboardQuestionSlice = createSlice({
  name: "dashboardQuestion",
  initialState: {
    value: {
      label: "Here is your question?",
      options: [],
      correctIndex: 0,
      selectedIndex: null,
      touched: false,
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
