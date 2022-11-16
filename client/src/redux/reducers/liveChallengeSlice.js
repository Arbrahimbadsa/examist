import { createSlice } from "@reduxjs/toolkit";
const liveChallengeSlice = createSlice({
  name: "liveChallenge",
  initialState: {
    player1: null,
    player2: null,
    isAccepted: false,
    isStarted: false,
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
  },
});

export const { setPlayer1, setPlayer2, setIsAccepted, setIsStarted } =
  liveChallengeSlice.actions;
export default liveChallengeSlice.reducer;
