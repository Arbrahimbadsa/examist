import mongoose from "mongoose";
const pastExamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  questionsCount: {
    type: Number,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
  subjects: {
    type: Array,
    required: true,
  },
  answerSheet: {
    type: Array,
  },
  prefix: {
    type: String,
  },
  questions: {
    type: Array,
    required: true,
  },
  time: {
    type: Object,
    required: true,
  },
  marks: {
    type: Object,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  isLiveChallenge: {
    type: Boolean,
    required: true,
  },
  liveExamPlayer: {
    type: Object,
  },
});

export const PastExam = mongoose.model("PastExam", pastExamSchema);
