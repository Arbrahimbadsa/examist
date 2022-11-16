import mongoose from "mongoose";
const questionSchema = mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  correctAnswer: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
  },
  chapter: {
    type: String,
  },
});

export const Question = mongoose.model("Question", questionSchema);
