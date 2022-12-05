import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
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
  setIsAnswerSheetLoading,
  setSelectedIndex,
  setShowExamPage,
} from "../redux/reducers/examSlice";
import { ArrowLeft, Bookmark, Check, Slash, X } from "react-feather";
import { useNavigate } from "react-router-dom";
import GreyText from "./GreyText";
import userImage from "../assets/user-11.jpg";
import convertToQM from "../utils/convertToQM";
import useTheme from "../hooks/useTheme";

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
  font-size: 13px;
  font-weight: bold;
  margin-top: 5px;
`;
const ViewResultButton = styled.button`
  color: #fff;
  background: #26d95f;
  border: none;
  border-radius: 10px;
  padding: 5px 15px;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
  margin-top: 5px;
  margin-right: 8px;
`;

export default function AnswerPage() {
  const navigate = useNavigate();

  // hooks
  const theme = useTheme();

  // states (redux)
  const questions = useSelector((state) => state.exam.questions); // current exam questions (for exam)
  const examPrefix = useSelector((state) => state.examCount.prefix); // current exam prefix
  const quickExamCount = useSelector((state) => state.examCount.quickExamCount); // current exam prefix count
  const customExamCount = useSelector(
    (state) => state.examCount.customExamCount
  );
  const count = examPrefix === "Custom Exam" ? customExamCount : quickExamCount;
  const showOnlyResult = useSelector((state) => state.exam.onlyResult);
  const answerSheet = useSelector((state) => state.exam.answerSheet);
  const marks = useSelector((state) => state.exam.marks);
  const name = useSelector((state) => state.exam.name);
  const isLiveChallenge = useSelector((state) => state.exam.isLiveChallenge);
  const player1 = useSelector((state) => state.liveChallenge.player1);
  const player2 = useSelector((state) => state.liveChallenge.player2);
  const isAnswerSheetLoading = useSelector(
    (state) => state.exam.isAnswerSheetLoading
  );

  // states
  const [whosResult, setWhosResult] = useState(player1?.name);

  // dispatcher
  const dispatcher = useDispatch();

  // states (pure)
  const isExamSubmitting = useSelector(
    (state) => state.loading.isExamSubmitting
  );
  const abcd = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

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

  return (
    <>
      {isExamSubmitting && (
        <LoadingHolder>Submitting the exam...</LoadingHolder>
      )}
      {!isExamSubmitting && (
        <>
          {!isLiveChallenge && (
            <ExamHeaderHolder
              secured={marks?.secured}
              style={{ background: theme.cardBg }}
            >
              <h3 style={{ color: theme.textColor }}>
                {name ? name : examPrefix + " - " + count}
              </h3>
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
          )}

          {isLiveChallenge && (
            <ExamHeaderHolder
              style={{ background: theme.cardBg, color: theme.textColor }}
            >
              <h3>Live Challenge Result</h3>
            </ExamHeaderHolder>
          )}

          {/* This section is only for live challenging */}
          {isLiveChallenge && (
            <ExamHeaderHolder
              style={{
                textAlign: "left",
                display: "flex",
                gap: "10px",
                background: theme.cardBg,
              }}
            >
              <UserInfoHolder>
                <Avatar
                  style={{
                    border: player1?.winner
                      ? "3.5px solid #26d95f"
                      : player1?.status !== "submitted"
                      ? "3.5px solid grey"
                      : "3.5px solid #FF0400",
                    padding: "3px",
                  }}
                  src={userImage}
                  alt=""
                />
                <UserName
                  style={{
                    color: player1?.winner
                      ? "#26d95f"
                      : player1?.status !== "submitted"
                      ? "grey"
                      : "#FF0400",
                  }}
                >
                  {player1?.name}
                </UserName>

                {player2?.status !== "left" && (
                  <GreyText
                    style={{
                      color: player1?.winner
                        ? "#26d95f"
                        : player1?.status !== "submitted"
                        ? "grey"
                        : "#FF0400",
                    }}
                  >
                    {player1?.status === "submitted" ? (
                      <>
                        {player1?.winner === "draw"
                          ? "It's a draw"
                          : player1?.winner
                          ? "Winner"
                          : "Work hard"}{" "}
                        <b>
                          ({marks?.secured} / {answerSheet.length})
                        </b>
                      </>
                    ) : player1?.status === "left" ? (
                      "left"
                    ) : (
                      "Waiting..."
                    )}
                  </GreyText>
                )}

                {player2?.status === "left" && (
                  <GreyText>
                    You got:{" "}
                    <b>
                      {marks?.secured} / {answerSheet.length}
                    </b>
                  </GreyText>
                )}

                <Flex>
                  <ViewResultButton
                    style={{
                      background: player1?.winner
                        ? "#26d95f"
                        : player1?.status !== "submitted"
                        ? "grey"
                        : "#FF0400",
                    }}
                    onClick={() => {
                      if (
                        player1?.status === "submitted" &&
                        player2?.status === "submitted"
                      ) {
                        const sheet = convertToQM(player1?.answerSheet, "full");
                        dispatcher(setIsAnswerSheetLoading(true));
                        setTimeout(() => {
                          setWhosResult(player1?.name);
                          dispatcher(setAnswerSheet(sheet));
                          dispatcher(setIsAnswerSheetLoading(false));
                        }, 500);
                      }
                    }}
                  >
                    View Result
                  </ViewResultButton>
                  <ViewResultButton
                    style={{
                      background: player1?.winner
                        ? "#26d95f"
                        : player1?.status !== "submitted"
                        ? "grey"
                        : "#FF0400",
                    }}
                    onClick={() => {
                      alert("This feature is coming soon.");
                    }}
                  >
                    Stats
                  </ViewResultButton>
                </Flex>
              </UserInfoHolder>

              <UserInfoHolder style={{ color: theme.textColor }}>
                <b>VS</b>
              </UserInfoHolder>

              <UserInfoHolder>
                <Avatar
                  style={{
                    border: player2?.winner
                      ? "3.5px solid #26d95f"
                      : player2?.status !== "submitted"
                      ? "3.5px solid grey"
                      : "3.5px solid #FF0400",
                    padding: "3px",
                  }}
                  src={userImage}
                  alt=""
                />
                <UserName
                  style={{
                    color: player2?.winner
                      ? "#26d95f"
                      : player2?.status !== "submitted"
                      ? "grey"
                      : "#FF0400",
                  }}
                >
                  {player2?.name}
                </UserName>

                <GreyText
                  style={{
                    color: player2?.winner
                      ? "#26d95f"
                      : player2?.status !== "submitted"
                      ? "grey"
                      : "#FF0400",
                  }}
                >
                  {player2?.status === "submitted" ? (
                    <>
                      {player2?.winner === "draw"
                        ? "It's a draw"
                        : player2?.winner
                        ? "Winner"
                        : "Work hard"}{" "}
                      <b>
                        ({player2?.marks?.secured} / {answerSheet.length})
                      </b>
                    </>
                  ) : player2?.status === "left" ? (
                    "left"
                  ) : (
                    "Waiting..."
                  )}
                </GreyText>

                <Flex>
                  <ViewResultButton
                    style={{
                      background: player2?.winner
                        ? "#26d95f"
                        : player2?.status !== "submitted"
                        ? "grey"
                        : "#FF0400",
                    }}
                    onClick={() => {
                      if (
                        player2?.status === "submitted" &&
                        player1?.status === "submitted"
                      ) {
                        const sheet = convertToQM(player2?.answerSheet, "full");
                        dispatcher(setIsAnswerSheetLoading(true));
                        setTimeout(() => {
                          setWhosResult(player2?.name);
                          dispatcher(setAnswerSheet(sheet));
                          dispatcher(setIsAnswerSheetLoading(false));
                        }, 500);
                      }
                    }}
                  >
                    View Result
                  </ViewResultButton>
                  <ViewResultButton
                    style={{
                      background: player2?.winner
                        ? "#26d95f"
                        : player2?.status !== "submitted"
                        ? "grey"
                        : "#FF0400",
                    }}
                    onClick={() => {
                      alert("This feature is coming soon.");
                    }}
                  >
                    Stats
                  </ViewResultButton>
                </Flex>
              </UserInfoHolder>
            </ExamHeaderHolder>
          )}

          {isLiveChallenge &&
            player1?.status !== "submitted" &&
            player2?.status !== "submitted" && (
              <ExamHeaderHolder style={{ background: theme.cardBg }}>
                <GreyText>
                  {player2?.status === "left"
                    ? `${player2?.name} did not complete the challenge.`
                    : "Waiting for other user to finish"}
                </GreyText>
              </ExamHeaderHolder>
            )}

          {/************** Answer Sheet Title ***********/}
          {isAnswerSheetLoading && <p>Loading...</p>}
          {!isAnswerSheetLoading && (
            <>
              <Flex>
                <div>
                  <h3 style={{ color: theme.textColor }}>
                    Answersheet ({answerSheet.length})
                  </h3>
                  {isLiveChallenge && <GreyText>{whosResult}</GreyText>}
                </div>

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
                    <QuestionWrapper
                      style={{ background: theme.cardBg }}
                      key={i}
                    >
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
    </>
  );
}
