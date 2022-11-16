import express from "express";
const questionRouter = express.Router();
import { verify } from "../middleware/checkLogin.js";

questionRouter.post("/add", verify, (req, res) => {
  // **********************
  const role = req.role;
  // **********************
  if (role === "admin") {
    return res.status(200).json({
      message: "Add question success!",
    });
  } else {
    return res.status(500).json({
      error: "Sorry, only admin can add questions!",
    });
  }
});

export default questionRouter;
