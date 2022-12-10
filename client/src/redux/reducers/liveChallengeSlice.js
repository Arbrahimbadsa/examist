import { createSlice } from "@reduxjs/toolkit";
const liveChallengeSlice = createSlice({
  name: "liveChallenge",
  initialState: {
    player1: null,
    player2: null,
    isAccepted: false,
    isStarted: false,
    pastLiveChallenges: [
      {
        player1: {
          name: "Arb Rahim Badsa",
          id: "63747df5ee1ca9d0d77a6609",
          username: "arbrahimbadsa",
          winner: true,
          marks: {
            correct: 0,
            incorrect: 1,
            skipped: 4,
            secured: -0.25,
          },
          answerSheet: [
            {
              id: "6381d68cea09457bfec0084a",
              label:
                "What is the value of - $**\\int_0^1\\tan^{-1}\\left(x\\right)\\mathrm{d}x**$",
              options: [3, 5, 6, "None"],
              selectedIndex: [2],
              touched: true,
              doubleAnswered: false,
              correctAnswer: 4,
            },
            {
              id: "6381d7e0ea09457bfec0084b",
              label:
                "What is - $** \\int_0^1\\frac{1}{\\sqrt{1+x^2}}\\mathrm{d}x **$",
              options: [1, 2, 3, 4],
              selectedIndex: [],
              touched: false,
              doubleAnswered: false,
              correctAnswer: 1,
            },
            {
              id: "6374e3c6c641067cbd4ba2f1",
              label:
                "Find - $**\\frac{\\mathrm{d}\\left(\\sin^{-1}\\left(x\\right)\\right)}{\\mathrm{d}x}**$",
              options: [5, 10, 30, "None"],
              selectedIndex: [],
              touched: false,
              doubleAnswered: false,
              correctAnswer: 4,
            },
            {
              id: "6375d315873c69e7ac8e36ac",
              label: "উত্তর বের কর - $*2 + 2*$?",
              options: [5, 10, 4, 100],
              selectedIndex: [],
              touched: false,
              doubleAnswered: false,
              correctAnswer: 3,
            },
            {
              id: "6375cf2c873c69e7ac8e36aa",
              label: "What is the value of $*50 + 17*$?",
              options: [5, 10, 67, 100],
              selectedIndex: [],
              touched: false,
              doubleAnswered: false,
              correctAnswer: 3,
            },
          ],
          status: "submitted",
        },
        player2: {
          name: "Tahsin Ahmed Tushar",
          id: "6374d9e40526c4e4b022ffad",
          username: "tushar",
          status: "submitted",
          examInfo: {
            answerSheet: [
              {
                id: "6381d68cea09457bfec0084a",
                label:
                  "What is the value of - $**\\int_0^1\\tan^{-1}\\left(x\\right)\\mathrm{d}x**$",
                options: [3, 5, 6, "None"],
                selectedIndex: [],
                touched: false,
                doubleAnswered: false,
                correctAnswer: 4,
              },
              {
                id: "6381d7e0ea09457bfec0084b",
                label:
                  "What is - $** \\int_0^1\\frac{1}{\\sqrt{1+x^2}}\\mathrm{d}x **$",
                options: [1, 2, 3, 4],
                selectedIndex: [],
                touched: false,
                doubleAnswered: false,
                correctAnswer: 1,
              },
              {
                id: "6374e3c6c641067cbd4ba2f1",
                label:
                  "Find - $**\\frac{\\mathrm{d}\\left(\\sin^{-1}\\left(x\\right)\\right)}{\\mathrm{d}x}**$",
                options: [5, 10, 30, "None"],
                selectedIndex: [],
                touched: false,
                doubleAnswered: false,
                correctAnswer: 4,
              },
              {
                id: "6375d315873c69e7ac8e36ac",
                label: "উত্তর বের কর - $*2 + 2*$?",
                options: [5, 10, 4, 100],
                selectedIndex: [1],
                touched: true,
                doubleAnswered: false,
                correctAnswer: 3,
              },
              {
                id: "6375cf2c873c69e7ac8e36aa",
                label: "What is the value of $*50 + 17*$?",
                options: [5, 10, 67, 100],
                selectedIndex: [2],
                touched: true,
                doubleAnswered: false,
                correctAnswer: 3,
              },
            ],
            marks: {
              correct: 0,
              incorrect: 2,
              skipped: 3,
              secured: -0.5,
            },
          },
          winner: false,
          marks: {
            correct: 0,
            incorrect: 2,
            skipped: 3,
            secured: -0.5,
          },
          answerSheet: [
            {
              id: "6381d68cea09457bfec0084a",
              label:
                "What is the value of - $**\\int_0^1\\tan^{-1}\\left(x\\right)\\mathrm{d}x**$",
              options: [3, 5, 6, "None"],
              selectedIndex: [],
              touched: false,
              doubleAnswered: false,
              correctAnswer: 4,
            },
            {
              id: "6381d7e0ea09457bfec0084b",
              label:
                "What is - $** \\int_0^1\\frac{1}{\\sqrt{1+x^2}}\\mathrm{d}x **$",
              options: [1, 2, 3, 4],
              selectedIndex: [],
              touched: false,
              doubleAnswered: false,
              correctAnswer: 1,
            },
            {
              id: "6374e3c6c641067cbd4ba2f1",
              label:
                "Find - $**\\frac{\\mathrm{d}\\left(\\sin^{-1}\\left(x\\right)\\right)}{\\mathrm{d}x}**$",
              options: [5, 10, 30, "None"],
              selectedIndex: [],
              touched: false,
              doubleAnswered: false,
              correctAnswer: 4,
            },
            {
              id: "6375d315873c69e7ac8e36ac",
              label: "উত্তর বের কর - $*2 + 2*$?",
              options: [5, 10, 4, 100],
              selectedIndex: [1],
              touched: true,
              doubleAnswered: false,
              correctAnswer: 3,
            },
            {
              id: "6375cf2c873c69e7ac8e36aa",
              label: "What is the value of $*50 + 17*$?",
              options: [5, 10, 67, 100],
              selectedIndex: [2],
              touched: true,
              doubleAnswered: false,
              correctAnswer: 3,
            },
          ],
        },
      },
    ],
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
  },
});

export const {
  setPlayer1,
  setPlayer2,
  setIsAccepted,
  setIsStarted,
  resetLiveChallenge,
  setPastLiveChallenges,
} = liveChallengeSlice.actions;
export default liveChallengeSlice.reducer;
