import express from "express";
const liveChallengeRouter = express.Router();
import { LiveChallenge } from "../models/liveChallenge.js";

liveChallengeRouter.post("/add", async (req, res) => {
  try {
    const { data } = req.body;
    if (data) {
      const liveChallenge = new LiveChallenge({
        data,
        between: [data?.players[0].id, data?.players[1].id],
      });
      await liveChallenge.save();
      return res.status(201).json(liveChallenge);
    } else {
      return res.json({
        error: "Please provide live challenge data.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Something went wrong.",
    });
  }
});

liveChallengeRouter.get("/all/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const challenges = await LiveChallenge.find({ between: id }, { data: 1 });
      const returnArray = challenges.map((c) => {
        return {
          id: c._id,
          ...c.data,
        };
      });
      return res.status(200).json(returnArray);
    } else {
      return res.json({
        error: "Something went wrong.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Something went wrong.",
      details: error,
    });
  }
});

export default liveChallengeRouter;
