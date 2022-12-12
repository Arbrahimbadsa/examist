import mongoose from "mongoose";
const liveChallengeSchema = mongoose.Schema({
  data: {
    type: Object,
    required: true,
  },
  between: {
    type: Array,
    required: true,
  },
});

export const LiveChallenge = mongoose.model(
  "LiveChallenge",
  liveChallengeSchema
);
