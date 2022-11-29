import express from "express";
const pastExamRouter = express.Router();
import { verify } from "../middleware/checkLogin.js";
import { PastExam } from "../models/pastExam.js";

pastExamRouter.post("/add", verify, async (req, res) => {
  const { pastExam } = req.body;
  if (pastExam) {
    try {
      const exam = new PastExam(pastExam);
      await exam.save();
      return res.status(201).json(exam);
    } catch (error) {
      return res.status(500).json({
        error: "Something went wrong.",
        details: error,
      });
    }
  } else {
    return res.status(500).json({
      error: "Please send past exam.",
    });
  }
});

pastExamRouter.post("/all", verify, async (req, res) => {
  try {
    const { id } = req.body;
    const exams = await PastExam.find({ user: id });
    return res.status(201).json(exams);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong.",
      details: error,
    });
  }
});

pastExamRouter.post("/delete", verify, async (req, res) => {
  try {
    const { id, user } = req.body;
    const exist = await PastExam.find({ _id: id });
    if (exist) {
      await PastExam.deleteOne({ _id: id, user });
      return res.status(200).json({
        message: "Deleted.",
      });
    } else {
      return res.status(201).json({
        message: "Entry does not exist.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong.",
      details: error,
    });
  }
});

pastExamRouter.post("/deleteAll", verify, async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      await PastExam.deleteMany({ user: id });
      res.status(200).json({
        message: "Deleted.",
      });
    } else {
      res.status(501).json({
        error: "No id provided.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong.",
      details: error,
    });
  }
});

export default pastExamRouter;
