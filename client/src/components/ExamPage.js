import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useContentIndex from "../hooks/useContentIndex";
import { disableContent } from "../redux/reducers/disableContentSlice";
import GoTop from "./GoTop";
import { resetLiveChallenge } from "../redux/reducers/liveChallengeSlice";
import AnswerPage from "./AnswerPage";
import QuestionPage from "./QuestionPage";

const ExamPageContainer = styled.div`
  padding: 26px 20% 10px 20%;
  font-family: "Poppins", sans-serif;
  @media only screen and (max-width: 600px) {
    padding: 16px 16px 65px 16px;
  }
  height: 100vh;
  overflow-y: scroll;
`;

export default function ExamPage() {
  const showExamPage = useSelector((state) => state.exam.showExamPage);
  const onlyResult = useSelector((state) => state.exam.onlyResult);

  // dispatcher
  const dispatcher = useDispatch();

  // hooks
  const contentIndex = useContentIndex();

  // refs
  const container = useRef(null);

  // effects
  useEffect(() => {
    if (contentIndex === 50 && !onlyResult) {
      dispatcher(disableContent(true));
    }
  }, [contentIndex, onlyResult, dispatcher]);

  useEffect(() => {
    window.onbeforeunload = () => "Would you like to proceed?";
  }, []);

  useEffect(() => {
    return () => {
      dispatcher(resetLiveChallenge());
    };
  }, [dispatcher]);

  return (
    <>
      <ExamPageContainer ref={container}>
        {showExamPage ? <QuestionPage /> : <AnswerPage />}
        <GoTop elem={container} />
      </ExamPageContainer>
    </>
  );
}
