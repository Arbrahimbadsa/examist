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
  setTotalQuestions,
} from "../redux/reducers/examSlice";
import {
  setIsAccepted,
  setIsStarted,
  setPlayer2,
} from "../redux/reducers/liveChallengeSlice";
import { setIsGeneratingQuestion } from "../redux/reducers/loadingSlice";
import {
  addNotification,
  setIsNewNotiFound,
} from "../redux/reducers/notificationSlice";
import { showToast } from "../redux/reducers/toastSlice";
import QuestionModel from "../utils/classes/QuestionModel";
import formatLocalTime from "../utils/formatLocalTime";

export default function useEvents() {
  const socket = useSelector((state) => state.socket.value);
  const dispatcher = useDispatch();
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
          })
        );
      });

      // this will fire after the countdown ends
      socket.on("start-exam", (data) => {
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
        socket.off("start-exam");
      }
    };
  }, [socket, dispatcher]);
}
