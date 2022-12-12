import { createSlice } from "@reduxjs/toolkit";
const liveChallengeSlice = createSlice({
  name: "liveChallenge",
  initialState: {
    player1: null,
    player2: null,
    isAccepted: false,
    isStarted: false,
    pastLiveChallenges: [],
  },
  reducers: {
    setPlayer1: (state, action) => {
      state.player1 = action.payload;
    },
    setPlayer2: (state, action) => {
      state.player2 = action.payload;
    },
    setIsAccepted: (state, action) => {
      state.isAccepted = action.payload;
    },
    setIsStarted: (state, action) => {
      state.isStarted = action.payload;
    },
    resetLiveChallenge: (state) => {
      state.isAccepted = false;
      state.isStarted = false;
    },
    setPastLiveChallenges: (state, action) => {
      //state.pastLiveChallenges = action.payload;
      if (action.payload?.length) {
        state.pastLiveChallenges = action.payload;
      } else {
        state.pastLiveChallenges = [
          ...state.pastLiveChallenges,
          action.payload,
        ];
      }
    },
    clearLiveExamSlice: (state) => {
      state.player1 = null;
      state.player2 = null;
      state.pastLiveChallenges = [];
    },
  },
});

export const {
  setPlayer1,
  setPlayer2,
  setIsAccepted,
  setIsStarted,
  resetLiveChallenge,
  setPastLiveChallenges,
  clearLiveExamSlice,
} = liveChallengeSlice.actions;
export default liveChallengeSlice.reducer;
