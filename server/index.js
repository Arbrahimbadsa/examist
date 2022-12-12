import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { applySocketMiddlewear, onConnection } from "./socket/index.js";
import dotenv from "dotenv";
import authRouter from "./api/auth.js";
import questionRouter from "./api/question.js";
import "colors";
import { connectMongoDB } from "./config/db.js";
import pastExamRouter from "./api/pastExam.js";
import liveChallengeRouter from "./api/liveChallenge.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// apply cors
app.use(cors());

// connect to mongodb
connectMongoDB();

// register routers
app.use("/api/user", authRouter);
app.use("/api/question", questionRouter);
app.use("/api/past-exam", pastExamRouter);
app.use("/api/live-challenge", liveChallengeRouter);

// register middlewear and setup
io.use(applySocketMiddlewear);
io.on("connection", (socket) => {
  onConnection(socket, io);
});

// start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () =>
  console.log(`\nServer started at port ${PORT}`.white.bgMagenta)
);
