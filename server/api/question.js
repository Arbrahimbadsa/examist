import express from "express";
const questionRouter = express.Router();
import { verify } from "../middleware/checkLogin.js";
import { Question } from "../models/question.js";

questionRouter.post("/test-answers", async (req, res) => {
  const { questionData, allId } = req.body;
  let correct = 0;
  let skipped = 0;
  let incorrect = 0;
  let secured = 0;
  const answerData = await Question.find(
    { _id: { $in: allId } },
    { _id: 1, correctAnswer: 1 }
  );
  questionData.forEach((q, i) => {
    if (q.selectedIndex.length === 0) {
      skipped++;
    } else {
      if (q.selectedIndex.length > 1) {
        incorrect++;
        secured -= 0.25;
      } else {
        const index = q.selectedIndex[0];
        if (
          q.id === answerData[i].id &&
          index === answerData[i].correctAnswer
        ) {
          correct++;
          secured += 1;
        } else {
          incorrect++;
          secured -= 0.25;
        }
      }
    }
  });
  res.status(201).json({
    marks: {
      correct,
      incorrect,
      skipped,
      secured,
    },
    answers: answerData,
  });
});

questionRouter.post("/add", verify, (req, res) => {
  // **********************
  const role = req.role;
  // **********************
  if (role === "admin") {
    return res.status(200).json({
      // add question here
      message: "Add question success!",
    });
  } else {
    return res.status(500).json({
      error: "Sorry, only admin can add questions!",
    });
  }
});

questionRouter.post("/get-filtered-questions", async (req, res) => {
  const { subjects, chapters, count } = req.body;
  if (count) {
    if (subjects && chapters) {
      const data = await Question.find(
        {
          subject: { $in: subjects },
          chapter: { $in: chapters },
        },
        { _id: 1, label: 1, options: 1, correctAnswer: 1 }
      ).limit(count);
      return res.status(201).json(data);
    } else {
      const data = await Question.find(
        {},
        { _id: 1, label: 1, options: 1 }
      ).limit(count);
      return res.status(201).json(data);
    }
  } else {
    return res.status(400).json({
      error: "Please provide count.",
    });
  }
});

export default questionRouter;
