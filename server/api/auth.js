import express from "express";
const authRouter = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";

authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const user = await User.findOne({ username });
      if (user) {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) {
          const token = jwt.sign(
            { username, id: user._id, role: user.role },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          return res.status(200).json({
            name: user.name,
            username: user.username,
            id: user._id,
            token,
            role: user.role,
          });
        } else {
          return res.status(401).json({
            error: "Incorrect credentials!",
          });
        }
      } else {
        return res.status(401).json({
          error: "Please register first!",
        });
      }
    } else {
      return res.status(401).json({
        error: "Incorrect credentials!",
      });
    }
  } catch (error) {
    return res.status(401).json({
      error,
    });
  }
});

authRouter.post("/register", async (req, res) => {
  const { name, username, password } = req.body;
  if (name && username && password) {
    const alreadyExist = await User.findOne({ username }).exec();
    if (alreadyExist) {
      return res.status(401).json({
        error: "User already exists!",
      });
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        username,
        password: encryptedPassword,
        role: "general",
      });
      const token = jwt.sign(
        { username, id: user._id, role: user.role },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.save((err) => {
        if (err) {
          return res.status(401).json({
            error: "Something went wrong.",
          });
        } else {
          return res.status(200).json({
            name: user.name,
            username: user.username,
            id: user._id,
            token,
            role: user.role,
          });
        }
      });
    }
  } else {
    return res.status(401).json({
      error: "Something went wrong.",
    });
  }
});

export default authRouter;
