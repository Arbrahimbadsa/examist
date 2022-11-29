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
  setAnswerSheet,
  setMarks,
  setSelectedIndex,
  setShowExamPage,
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
import { setPastExams } from "../redux/reducers/pastExamSlice";
import { getDate } from "../utils/getDate";
import axios from "../api/axios";
import useHeader from "../hooks/useHeader";
import useUser from "../hooks/useUser";
import userImage from "../assets/user-11.jpg";
import userImage1 from "../assets/user-6.jpg";
import { resetLiveChallenge } from "../redux/reducers/liveChallengeSlice";

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
  background: ${(props) => (props.secured < 0 ? "white" : "white")};
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
const UserInfoHolder = styled.div`
  flex-grow: 1;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: block;
`;
const UserName = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
`;

export default function ExamPage() {
  const navigate = useNavigate();

  // hooks
  const { headers } = useHeader();
  const user = useUser();

  // states (redux)
  const examTime = useSelector((state) => state.exam.examTime); // current exam time
  const questions = useSelector((state) => state.exam.questions); // current exam questions (for exam)
  const examId = useSelector((state) => state.exam.examId); // current exam id
  const totalQuestions = useSelector((state) => state.exam.totalQuestions); // current exam total question number
  const isNegAllowed = useSelector((state) => state.exam.isNegAllowed); // current exam whether neg allowed
  const subjects = useSelector((state) => state.exam.subjects); // current exam subjects
  const examPrefix = useSelector((state) => state.examCount.prefix); // current exam prefix
  const quickExamCount = useSelector((state) => state.examCount.quickExamCount); // current exam prefix count
  const customExamCount = useSelector(
    (state) => state.examCount.customExamCount
  );
  const count = examPrefix === "Custom Exam" ? customExamCount : quickExamCount;
  const isGeneratingQuestion = useSelector(
    (state) => state.loading.isGeneratingQuestion
  );
  const showExamPage = useSelector((state) => state.exam.showExamPage);
  const showOnlyResult = useSelector((state) => state.exam.onlyResult);
  const answerSheet = useSelector((state) => state.exam.answerSheet);
  const onlyResult = useSelector((state) => state.exam.onlyResult);
  const marks = useSelector((state) => state.exam.marks);
  const name = useSelector((state) => state.exam.name);
  const pastExams = useSelector((state) => state.pastExams.value);
  const retake = useSelector((state) => state.exam.retake);
  const isLiveChallenge = useSelector((state) => state.exam.isLiveChallenge);
  const player1 = useSelector((state) => state.liveChallenge.player1);
  const player2 = useSelector((state) => state.liveChallenge.player2);
  const socket = useSelector((state) => state.socket.value);

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

  const is =
    examTime === 60 ? "1 hr" : examTime > 60 ? "1+ hr" : examTime + " min"; // current exam time
  const from = formatLocalTime(now.toLocaleTimeString()); // exam started from
  const to = formatLocalTime(afterExam.toLocaleTimeString()); // exam will end at
  const on = getDate(); // today (date)

  // add to past exam
  const addToPastExam = async (completed, marks) => {
    const pastExam = {
      id: examId,
      name: `${examPrefix} - ${count}`,
      questionsCount: +totalQuestions,
      isNegAllowed: isNegAllowed,
      isCompleted: completed,
      subjects: subjects,
      answerSheet: window.answerSheet,
      prefix: examPrefix,
      questions,
      time: {
        is,
        from,
        to,
        on,
      },
      marks,
      user: user?.id,
    };
    if (retake === "retake") {
      // delete the entry first if only it's a retake
      // we are sure that examId is now exam._id
      await axios.post(
        `/api/past-exam/delete`,
        {
          id: examId,
          user: user?.id,
        },
        { headers }
      );
    }
    // add past exam to db (could be a retake or new)
    const { data } = await axios.post(
      `/api/past-exam/add`,
      { pastExam },
      { headers }
    );
    const found = pastExams.filter((exam) => exam._id !== examId);
    found.push(data);
    dispatcher(setPastExams(found));
  };

  const handleLiveChallenge = (name) => {
    if (isLiveChallenge) {
      socket?.emit(name, {
        to: player2,
        from: {
          name: player1?.name,
          id: player1?.id,
          username: player1?.username,
        },
      });
    }
  };

  // confirm exam submit
  const handleConfirmSubmit = async () => {
    //navigate("answer-sheet/" + examId);
    window.onbeforeunload = () => {};

    setIsExamSubmitting(true);

    // map the ids to get the answers
    const questionData = questions.map((q) => {
      return { id: q.id, selectedIndex: q.selectedIndex };
    });
    const ids = questions.map((q) => q.id);
    // fetch the answers
    const { data } = await axios.post(
      `/api/question/test-answers`,
      {
        questionData,
        allId: ids,
      },
      {
        headers,
      }
    );
    // set the correct answers
    window.answerSheet.forEach((q, i) => {
      const entry = data?.answers.find((e) => e._id === q.id);
      q.correctAnswer = entry.correctAnswer;
    });
    console.log(data);
    // test the answer sheet
    console.log(window.answerSheet);
    // set the answers sheet
    dispatcher(setAnswerSheet(window.answerSheet));
    // set the marks
    dispatcher(setMarks(data.marks));
    setAreYouSure(false);
    dispatcher(disableContent(false));
    dispatcher(setShowExamPage(false));
    setTimeout(() => {
      setIsExamSubmitting(false);
      addToPastExam(true, data.marks); // add to past exam - completed
    }, 1000);

    // live challenge submitted by one user
    handleLiveChallenge("submit-challenge");
  };

  const resetToHomePage = () => {
    dispatcher(disableContent(false));
    dispatcher(setShowExamPage(true));
    dispatcher(setAnswerSheet([]));
    dispatcher(setContentIndex(0));
    window.answerSheet = null;
    window.onbeforeunload = () => {};
    navigate("/dashboard");
    dispatcher(clearNewExamInputs());
    handleLiveChallenge("left-challenge");
    addToPastExam(false, {}); // add to past exam - incompleted
  };

  const backToHome = () => {
    dispatcher(disableContent(false));
    dispatcher(setShowExamPage(true));
    dispatcher(setAnswerSheet([]));
    window.answerSheet = null;
    window.onbeforeunload = () => {};
    navigate("/dashboard");
    dispatcher(clearNewExamInputs());
    if (showOnlyResult) {
      dispatcher(setContentIndex(1));
    } else {
      dispatcher(setContentIndex(0));
    }
  };

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
        {/************** Are you sure dialog ***********/}
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

        {/************** Exam Page ***********/}
        {showExamPage ? (
          <>
            {isGeneratingQuestion && (
              <LoadingHolder>Generating a question set...</LoadingHolder>
            )}
            {!isGeneratingQuestion && (
              <>
                {/************** Exam Header ***********/}
                <ExamHeaderHolder>
                  <h3>
                    {examPrefix} - {count}
                  </h3>
                  <MetaHolder>
                    <TimeMetaHolder>Start: {from}</TimeMetaHolder>
                    <TimeMetaHolder>End: {to}</TimeMetaHolder>
                  </MetaHolder>
                  <ExamInfoHolder>
                    <ExamInfo>
                      <List style={{ marginRight: "8px" }} size={20} />
                      <p>{questions.length}</p>
                    </ExamInfo>
                    <ExamInfo>
                      <Clock style={{ marginRight: "8px" }} size={20} />
                      <p>{is}</p>
                    </ExamInfo>
                    <ExamInfo>
                      <Target style={{ marginRight: "8px" }} size={20} />
                      <p>{questions.length}</p>
                    </ExamInfo>
                  </ExamInfoHolder>
                </ExamHeaderHolder>

                {/* This section is only for live challenging */}
                {isLiveChallenge && (
                  <ExamHeaderHolder
                    style={{ textAlign: "left", display: "flex", gap: "10px" }}
                  >
                    <UserInfoHolder>
                      <Avatar src={userImage} alt="" />
                      <UserName>{player1?.name}</UserName>
                      <GreyText>busy with exam</GreyText>
                    </UserInfoHolder>
                    <UserInfoHolder>
                      <b>VS</b>
                    </UserInfoHolder>
                    <UserInfoHolder>
                      <Avatar src={userImage1} alt="" />
                      <UserName
                        style={{
                          color:
                            player2?.status === "left"
                              ? "red"
                              : player2?.status === "submitted"
                              ? "#26d95f"
                              : "black",
                        }}
                      >
                        {player2?.name}
                      </UserName>
                      <GreyText
                        style={{
                          color:
                            player2?.status === "left"
                              ? "red"
                              : player2?.status === "submitted"
                              ? "#26d95f"
                              : "grey",
                        }}
                      >
                        {player2?.status === "left"
                          ? "left"
                          : player2?.status === "submitted"
                          ? "submitted the exam"
                          : "busy with exam"}
                      </GreyText>
                    </UserInfoHolder>
                  </ExamHeaderHolder>
                )}

                {/************** Timer and Exit Button ***********/}

                <TimerAndExitHolder>
                  <Timer
                    expiryTimestamp={time}
                    onExpire={handleConfirmSubmit}
                  />
                  <ExitButton onClick={resetToHomePage}>Exit</ExitButton>
                </TimerAndExitHolder>

                {/************** Questions Holder ***********/}

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
                  {/************** Submit Button ***********/}

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
          /* Answer Page */
          <>
            {isExamSubmitting && (
              <LoadingHolder>Submitting the exam...</LoadingHolder>
            )}
            {!isExamSubmitting && (
              <>
                <ExamHeaderHolder secured={marks?.secured}>
                  <h3>{name ? name : examPrefix + " - " + count}</h3>
                  <Info success>
                    <InfoText>
                      {showOnlyResult ? "" : "Answers submitted successfully."}
                    </InfoText>
                  </Info>
                  <ObtainedText>
                    Obtained Marks:{" "}
                    <b>
                      {marks ? marks.secured : "-"} / {answerSheet.length}
                    </b>
                  </ObtainedText>
                  <ExamInfoHolder>
                    <ExamInfo>
                      <Check
                        color="#26D95F"
                        style={{ marginRight: "8px" }}
                        size={20}
                      />
                      <p style={{ color: "#26D95F" }}>
                        {marks ? marks.correct : "-"}
                      </p>
                    </ExamInfo>
                    <ExamInfo>
                      <X color="red" style={{ marginRight: "8px" }} size={20} />
                      <p style={{ color: "red" }}>
                        {marks ? marks.incorrect : "-"}
                      </p>
                    </ExamInfo>
                    <ExamInfo>
                      <Slash style={{ marginRight: "8px" }} size={16} />
                      <p>{marks ? marks.skipped : "-"}</p>
                    </ExamInfo>
                  </ExamInfoHolder>
                </ExamHeaderHolder>

                {/************** Answer Sheet Title ***********/}

                <Flex>
                  <h3>Answersheet ({answerSheet.length})</h3>
                  <Flex showCursor={true} onClick={backToHome}>
                    <ArrowLeft
                      color="grey"
                      style={{ marginRight: "5px" }}
                      size={15}
                    />
                    <GreyText>Back to home</GreyText>
                  </Flex>
                </Flex>
                <QuestionsHolder>
                  {answerSheet &&
                    answerSheet.map((question, i) => (
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
