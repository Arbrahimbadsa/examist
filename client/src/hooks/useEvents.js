import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContentIndex } from "../redux/reducers/contentIndexSlice";
import { disableContent } from "../redux/reducers/disableContentSlice";
import { setExamPrefix } from "../redux/reducers/examCountSlice";
import {
  setExamId,
  setExamTime,
  setIsLiveChallenge,
  setIsNegAllowed,
  setQuestions,
  setShowExamPage,
  setTotalQuestions,
} from "../redux/reducers/examSlice";
import {
  setIsAccepted,
  setIsStarted,
  setPlayer2,
  setPlayer1,
  setPastLiveChallenges,
} from "../redux/reducers/liveChallengeSlice";
import { setIsGeneratingQuestion } from "../redux/reducers/loadingSlice";
import {
  addNotification,
  setIsNewNotiFound,
} from "../redux/reducers/notificationSlice";
import { showToast } from "../redux/reducers/toastSlice";
import QuestionModel from "../utils/classes/QuestionModel";
import formatLocalTime from "../utils/formatLocalTime";
import useUser from "./useUser";

export default function useEvents() {
  const socket = useSelector((state) => state.socket.value);
  const dispatcher = useDispatch();
  const player1 = useSelector((state) => state.liveChallenge.player1);
  const player2 = useSelector((state) => state.liveChallenge.player2);
  const marks = useSelector((state) => state.exam.marks);
  const answerSheet = useSelector((state) => state.exam.answerSheet);
  const currentUser = useUser();

  const getWinner = (marks) => {
    if (player2?.status === "submitted") {
      const player2examInfo = player2?.examInfo;
      console.log("player 1 marks", marks);
      console.log("player 2 marks", player2examInfo.marks);
      let winner = "";
      if (marks?.secured > player2examInfo.marks.secured) {
        // player 1 wins
        winner = 1;
        dispatcher(
          setPlayer1({
            ...player1,
            winner: true,
          })
        );
      } else if (marks?.secured === player2examInfo.marks.secured) {
        // it's a draw
        winner = 0;
        dispatcher(
          setPlayer1({
            ...player1,
            winner: "draw",
          })
        );
        dispatcher(
          setPlayer2({
            ...player2,
            winner: "draw",
          })
        );
      } else {
        // player 2 wins
        winner = 2;
        dispatcher(
          setPlayer2({
            ...player2,
            winner: true,
          })
        );
      }
      return winner;
    } else {
      console.log("player 1 marks", marks);
      console.log("Player 2 hasn't submitted yet.");
      return null;
    }
  };

  useEffect(() => {
    if (socket) {
      // this will fire for player 2
      socket.on("send-challenge", (data) => {
        dispatcher(setIsNewNotiFound(true));
        const noti = {
          type: "challenge",
          at: formatLocalTime(new Date().toLocaleTimeString()),
          sender: data.from,
          to: data.to,
        };
        dispatcher(addNotification(noti));
        dispatcher(showToast("You've got a new notification!"));
      });

      // this will fire for player one (after acceptance)
      socket.on("challenge-confirmed", (data) => {
        dispatcher(setIsAccepted(true));
        dispatcher(setIsStarted(true));
        dispatcher(showToast("Your challenge has been accepted."));
      });

      socket.on("left-challenge", (data) => {
        const player2 = data?.from;
        dispatcher(showToast(`${player2?.name} left the challenge.`));
        dispatcher(
          setPlayer2({
            ...player2,
            status: "left",
          })
        );
      });

      socket.on("submit-challenge", (data) => {
        const player2 = data?.from;
        dispatcher(showToast(`${player2?.name} submitted the challenge.`));
        dispatcher(
          setPlayer2({
            ...player2,
            status: "submitted",
            examInfo: data?.examInfo,
          })
        );
      });

      const addToPastLiveChallenge = (data) => {
        dispatcher(setPastLiveChallenges(data));
      };

      socket.on("player-1-win", (data) => {
        const winner = data?.winner;
        const loserExamInfo = data?.loser.examInfo;
        const winnerExamInfo = data?.winner.examInfo;
        if (winner.username === currentUser?.username) {
          // player 1 win detected
          dispatcher(
            setPlayer1({
              ...player1,
              winner: true,
              marks: winnerExamInfo.marks,
              answerSheet: winnerExamInfo.answerSheet,
              status: "submitted",
            })
          );
          dispatcher(
            setPlayer2({
              ...player2,
              winner: false,
              marks: loserExamInfo.marks,
              answerSheet: loserExamInfo.answerSheet,
              status: "submitted",
            })
          );
          // add to past live challenges
          addToPastLiveChallenge({
            player1: {
              ...player1,
              winner: true,
              marks: winnerExamInfo.marks,
              answerSheet: winnerExamInfo.answerSheet,
              status: "submitted",
            },
            player2: {
              ...player2,
              winner: false,
              marks: loserExamInfo.marks,
              answerSheet: loserExamInfo.answerSheet,
              status: "submitted",
            },
          });
        } else {
          // player 1 lose detected
          dispatcher(
            setPlayer1({
              ...player1,
              winner: false,
              marks: loserExamInfo.marks,
              answerSheet: loserExamInfo.answerSheet,
              status: "submitted",
            })
          );
          dispatcher(
            setPlayer2({
              ...player2,
              winner: true,
              marks: winnerExamInfo.marks,
              answerSheet: winnerExamInfo.answerSheet,
              status: "submitted",
            })
          );
          // add to past live challenges
          addToPastLiveChallenge({
            player1: {
              ...player1,
              winner: false,
              marks: loserExamInfo.marks,
              answerSheet: loserExamInfo.answerSheet,
              status: "submitted",
            },
            player2: {
              ...player2,
              winner: true,
              marks: winnerExamInfo.marks,
              answerSheet: winnerExamInfo.answerSheet,
              status: "submitted",
            },
          });
        }
      });

      socket.on("player-2-win", (data) => {
        const winner = data?.winner;
        const loserExamInfo = data?.loser.examInfo;
        const winnerExamInfo = data?.winner.examInfo;
        console.log(data);
        if (winner.username === currentUser?.username) {
          // player 1 win detected
          dispatcher(
            setPlayer1({
              ...player1,
              winner: true,
              marks: winnerExamInfo.marks,
              answerSheet: winnerExamInfo.answerSheet,
              status: "submitted",
            })
          );
          dispatcher(
            setPlayer2({
              ...player2,
              winner: false,
              marks: loserExamInfo.marks,
              answerSheet: loserExamInfo.answerSheet,
              status: "submitted",
            })
          );
          // add to past live challenges
          addToPastLiveChallenge({
            player1: {
              ...player1,
              winner: true,
              marks: winnerExamInfo.marks,
              answerSheet: winnerExamInfo.answerSheet,
              status: "submitted",
            },
            player2: {
              ...player2,
              winner: false,
              marks: loserExamInfo.marks,
              answerSheet: loserExamInfo.answerSheet,
              status: "submitted",
            },
          });
        } else {
          // player 1 lose detected
          dispatcher(
            setPlayer1({
              ...player1,
              winner: false,
              marks: loserExamInfo.marks,
              answerSheet: loserExamInfo.answerSheet,
              status: "submitted",
            })
          );
          dispatcher(
            setPlayer2({
              ...player2,
              winner: true,
              marks: winnerExamInfo.marks,
              answerSheet: winnerExamInfo.answerSheet,
              status: "submitted",
            })
          );
          // add to past live challenges
          addToPastLiveChallenge({
            player1: {
              ...player1,
              winner: false,
              marks: loserExamInfo.marks,
              answerSheet: loserExamInfo.answerSheet,
              status: "submitted",
            },
            player2: {
              ...player2,
              winner: true,
              marks: winnerExamInfo.marks,
              answerSheet: winnerExamInfo.answerSheet,
              status: "submitted",
            },
          });
        }
      });

      socket.on("draw-update", (data) => {
        const players = [data?.players.player1, data?.players.player2];
        let p1;
        let p2;
        players.forEach((player) => {
          if (player.username === currentUser.username) {
            p1 = {
              ...player1,
              winner: "draw",
              marks: player.examInfo.marks,
              answerSheet: player.examInfo.answerSheet,
              status: "submitted",
            };
            dispatcher(setPlayer1(p1));
          } else {
            p2 = {
              ...player2,
              winner: "draw",
              marks: player.examInfo.marks,
              answerSheet: player.examInfo.answerSheet,
              status: "submitted",
            };
            dispatcher(setPlayer2(p2));
          }
        });
        addToPastLiveChallenge({
          player1: p1,
          player2: p2,
        });
      });

      // this will fire after the countdown ends
      socket.on("start-exam", (data) => {
        dispatcher(setShowExamPage(true));
        // live challenge starts from here.
        const exam = data;
        const questions = [];
        exam.questions.forEach((e) => {
          const ex = new QuestionModel(
            e._id,
            e.count,
            e.label,
            e.options,
            null
          );
          questions.push(ex);
        });

        // dispatch all the exam info
        dispatcher(setContentIndex(50));
        dispatcher(disableContent(true));
        disableContent(setIsGeneratingQuestion(true));
        dispatcher(setExamId(exam.examId));
        dispatcher(setTotalQuestions(exam.totalQuestions));
        dispatcher(setExamTime(exam.examTime));
        dispatcher(setIsNegAllowed(exam.isNegAllowed));
        dispatcher(setQuestions(questions));
        dispatcher(setExamPrefix(exam.name));
        dispatcher(setIsGeneratingQuestion(false));
        dispatcher(setIsLiveChallenge(true));
      });
    }
    return () => {
      if (socket) {
        socket.off("send-challenge");
        socket.off("challenge-confirmed");
        socket.off("player-1-win");
        socket.off("player-2-win");
        socket.off("draw-update");
        socket.off("left-challenge");
        socket.off("submit-challenge");
        socket.off("start-exam");
      }
    };
  }, [socket, dispatcher, player1, player2, marks, answerSheet, currentUser]);
}
