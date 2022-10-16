import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Timer from "./Timer";
import { useDispatch, useSelector } from "react-redux";
import useContentIndex from "../hooks/useContentIndex";
import { disableContent } from "../redux/reducers/disableContentSlice";
import { setContentIndex } from "../redux/reducers/contentIndexSlice";
import IconButton from "./IconButton";
import {
  Question,
  QuestionLabel,
  QuestionOption,
  QuestionOptions,
} from "./Question";
import RenderLatex from "./RenderLatex";
import {
  clearNewExamInputs,
  setSelectedIndex,
} from "../redux/reducers/examSlice";
import GoTop from "./GoTop";
import formatLocalTime from "../utils/formatLocalTime";
import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock,
  List,
  Slash,
  Target,
  X,
} from "react-feather";
import { Dialog, DialogBody } from "./Dialog";
import { useNavigate } from "react-router-dom";
import GreyText from "./GreyText";

const ExamPageContainer = styled.div`
  padding: 26px 20% 10px 20%;
  font-family: "Poppins", sans-serif;
  @media only screen and (max-width: 600px) {
    padding: 16px 16px 65px 16px;
  }
  height: 100vh;
  overflow-y: scroll;
`;
const QuestionsHolder = styled.div``;
const QuestionWrapper = styled.div`
  margin: 20px 0;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`;
const QuestionCountHolder = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  color: #a4b8ca;
  border-bottom: 1px solid #dae0e6;
  width: auto;
  display: inline-block;
`;
const ExamHeaderHolder = styled.div`
  height: auto;
  width: 100%;
  background: #fff;
  padding: 15px 10px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`;
const TimerAndExitHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
const ExitButton = styled.div`
  border: none;
  height: 45px;
  width: 200px;
  color: #fff;
  background: #13b2ec;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    margin-top: 15px;
    width: 100%;
    cursor: default;
  }
`;
const MetaHolder = styled.div`
  display: flex;
  justify-content: center;
`;
const TimeMetaHolder = styled.p`
  margin: 0 5px;
  color: grey;
  font-size: 15px;
`;
const SubmitButtonHolder = styled.div`
  display: flex;
  justify-content: center;
`;
const SubmitButton = styled.div`
  height: 45px;
  width: 150px;
  background: #13b2ec;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;
const LoadingHolder = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
`;
const ExamInfoHolder = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
const ExamInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
  border-right: 1px solid grey;
  padding: 0 10px;
  &:last-child {
    border: none;
  }
  font-size: 15px;
`;
const DialogSubmitButton = styled.button`
  height: auto;
  width: auto;
  padding: 10px 30px;
  border: none;
  background: #13b2ec;
  color: #fff;
  margin: 15px 0 0 0;
  cursor: pointer;
  border-radius: 5px;
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;
const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InfoText = styled.p`
  font-size: 15px;
  color: #26d95f;
`;
const CountAndCorrect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const CorrectText = styled.p`
  color: ${(props) => (props.correct ? "#26d95f" : "red")};
  font-size: 12px;
`;
const ObtainedText = styled.p`
  color: #a4b8ca;
  font-size: 14px;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${(props) => (props.showCursor ? "pointer" : "default")};
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;

export default function ExamPage() {
  const navigate = useNavigate();

  // states (redux)
  const examTime = useSelector((state) => state.exam.examTime);
  const questions = useSelector((state) => state.exam.questions);
  const examId = useSelector((state) => state.exam.examId);
  const isGeneratingQuestion = useSelector(
    (state) => state.loading.isGeneratingQuestion
  );

  // timer
  const time = new Date();
  time.setSeconds(time.getSeconds() + examTime * 60);

  // time calc
  const now = new Date();
  const afterExam = new Date();
  afterExam.setSeconds(afterExam.getSeconds() + examTime * 60);

  // dispatcher
  const dispatcher = useDispatch();

  // states (pure)
  const [areYouSure, setAreYouSure] = useState(false);
  const [showExamPage, setShowExamPage] = useState(true);
  const [isExamSubmitting, setIsExamSubmitting] = useState(false);
  const abcd = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  // hooks
  const contentIndex = useContentIndex();

  // refs
  const container = useRef(null);

  // handles
  const handleExamSubmit = () => {
    setAreYouSure(true);
  };

  const handleConfirmSubmit = () => {
    navigate("answer-sheet/" + examId);
    window.onbeforeunload = () => {};
    console.log(window.answerSheet);
    setAreYouSure(false);
    dispatcher(disableContent(false));
    setShowExamPage(false);
    setIsExamSubmitting(true);
    setTimeout(() => {
      setIsExamSubmitting(false);
    }, 3000);
  };

  const resetToHomePage = () => {
    dispatcher(disableContent(false));
    dispatcher(setContentIndex(0));
    window.answerSheet = null;
    window.onbeforeunload = () => {};
    navigate("/dashboard");
    dispatcher(clearNewExamInputs());
  };

  // effects
  useEffect(() => {
    if (contentIndex === 50) {
      dispatcher(disableContent(true));
    }
  }, [contentIndex, dispatcher]);

  useEffect(() => {
    window.onbeforeunload = () => "Would you like to proceed?";
  }, []);

  return (
    <>
      <ExamPageContainer ref={container}>
        <Dialog
          show={areYouSure}
          title="Are you sure you want to submit?"
          small
          onClose={() => setAreYouSure(false)}
        >
          <DialogBody>
            <p>This can not be undone.</p>
            <DialogSubmitButton onClick={handleConfirmSubmit}>
              Submit
            </DialogSubmitButton>
          </DialogBody>
        </Dialog>
        {showExamPage ? (
          <>
            {isGeneratingQuestion && (
              <LoadingHolder>Generating a question set...</LoadingHolder>
            )}
            {!isGeneratingQuestion && (
              <>
                <ExamHeaderHolder>
                  <h3>Quick exam - 15</h3>
                  <MetaHolder>
                    <TimeMetaHolder>
                      Start: {formatLocalTime(now.toLocaleTimeString())}
                    </TimeMetaHolder>
                    <TimeMetaHolder>
                      End: {formatLocalTime(afterExam.toLocaleTimeString())}
                    </TimeMetaHolder>
                  </MetaHolder>
                  <ExamInfoHolder>
                    <ExamInfo>
                      <List style={{ marginRight: "8px" }} size={20} />
                      <p>{questions.length}</p>
                    </ExamInfo>
                    <ExamInfo>
                      <Clock style={{ marginRight: "8px" }} size={20} />
                      <p>
                        {examTime === 60
                          ? "1 hr"
                          : examTime > 60
                          ? "1+ hr"
                          : examTime + " min"}
                      </p>
                    </ExamInfo>
                    <ExamInfo>
                      <Target style={{ marginRight: "8px" }} size={20} />
                      <p>{questions.length}</p>
                    </ExamInfo>
                  </ExamInfoHolder>
                </ExamHeaderHolder>
                <TimerAndExitHolder>
                  <Timer
                    expiryTimestamp={time}
                    onExpire={handleConfirmSubmit}
                  />
                  <ExitButton onClick={resetToHomePage}>Exit</ExitButton>
                </TimerAndExitHolder>
                <QuestionsHolder>
                  {questions &&
                    questions.map((question, i) => (
                      <QuestionWrapper key={i}>
                        <QuestionCountHolder>
                          Question {i + 1}
                        </QuestionCountHolder>
                        <Question>
                          <QuestionLabel>
                            <RenderLatex latex={question.label} />
                          </QuestionLabel>
                          <QuestionOptions>
                            {question.options &&
                              question.options.map((option, j) => (
                                <QuestionOption
                                  id={j}
                                  onOptionClick={() => {
                                    dispatcher(
                                      setSelectedIndex({
                                        question,
                                        index: j + 1,
                                        questions,
                                      })
                                    );
                                  }}
                                  optionCount={abcd[j]}
                                  key={j}
                                  label={option}
                                  touched={question.touched}
                                  onlyOne={false}
                                />
                              ))}
                          </QuestionOptions>
                        </Question>
                      </QuestionWrapper>
                    ))}
                  <SubmitButtonHolder>
                    <SubmitButton onClick={handleExamSubmit}>
                      Submit
                    </SubmitButton>
                  </SubmitButtonHolder>
                </QuestionsHolder>
              </>
            )}
          </>
        ) : (
          <>
            {isExamSubmitting && (
              <LoadingHolder>Submitting the exam...</LoadingHolder>
            )}
            {!isExamSubmitting && (
              <>
                <ExamHeaderHolder>
                  <h3>Quick exam - 15</h3>
                  <Info success>
                    <InfoText>Answers submitted successfully.</InfoText>
                  </Info>
                  <ObtainedText>Obtained Marks: 3 / 6</ObtainedText>
                  <ExamInfoHolder>
                    <ExamInfo>
                      <Check
                        color="#26D95F"
                        style={{ marginRight: "8px" }}
                        size={20}
                      />
                      <p style={{ color: "#26D95F" }}>{questions.length}</p>
                    </ExamInfo>
                    <ExamInfo>
                      <X color="red" style={{ marginRight: "8px" }} size={20} />
                      <p style={{ color: "red" }}>10</p>
                    </ExamInfo>
                    <ExamInfo>
                      <Slash style={{ marginRight: "8px" }} size={16} />
                      <p>{questions.length}</p>
                    </ExamInfo>
                  </ExamInfoHolder>
                </ExamHeaderHolder>
                <Flex>
                  <h3>Answersheet ({questions.length})</h3>
                  <Flex showCursor={true} onClick={resetToHomePage}>
                    <ArrowLeft
                      color="grey"
                      style={{ marginRight: "5px" }}
                      size={15}
                    />
                    <GreyText>Back to home</GreyText>
                  </Flex>
                </Flex>
                <QuestionsHolder>
                  {window.answerSheet &&
                    window.answerSheet.map((question, i) => (
                      <QuestionWrapper key={i}>
                        <CountAndCorrect>
                          <QuestionCountHolder>
                            Question {i + 1}
                          </QuestionCountHolder>
                          {question.getIsCorrectlyAnswered() !== null ? (
                            <CorrectText
                              correct={question.getIsCorrectlyAnswered()}
                            >
                              {question.getIsCorrectlyAnswered()
                                ? "Correct"
                                : "Incorrect"}
                            </CorrectText>
                          ) : (
                            <p style={{ color: "#a4b8ca", fontSize: "12px" }}>
                              Skipped
                            </p>
                          )}
                          <IconButton>
                            <Bookmark size={20} color="#000" />
                          </IconButton>
                        </CountAndCorrect>
                        <Question>
                          <QuestionLabel>
                            <RenderLatex latex={question.label} />
                          </QuestionLabel>
                          <QuestionOptions>
                            {question.options &&
                              question.options.map((option, j) => (
                                <QuestionOption
                                  id={j}
                                  onOptionClick={() => {
                                    dispatcher(
                                      setSelectedIndex({
                                        question,
                                        index: j + 1,
                                        questions,
                                      })
                                    );
                                  }}
                                  optionCount={abcd[j]}
                                  key={j}
                                  label={option}
                                  touched={true}
                                  changeCorrectBg={
                                    question.correctAnswer === j + 1
                                  }
                                  selectedInCorrect={question.isIncorrect(
                                    question.correctAnswer,
                                    j + 1
                                  )}
                                  selectedCorrect={question.isCorrect(
                                    question.correctAnswer,
                                    j + 1
                                  )}
                                  onlyOne={true}
                                />
                              ))}
                          </QuestionOptions>
                        </Question>
                      </QuestionWrapper>
                    ))}
                </QuestionsHolder>
              </>
            )}
          </>
        )}
        <GoTop elem={container} />
      </ExamPageContainer>
    </>
  );
}
