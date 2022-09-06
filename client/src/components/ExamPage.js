import { useEffect } from "react";
import styled from "styled-components";
import Timer from "./Timer";
import { useDispatch, useSelector } from "react-redux";
import useContentIndex from "../hooks/useContentIndex";
import { disableContent } from "../redux/reducers/disableContentSlice";
import { setContentIndex } from "../redux/reducers/contentIndexSlice";
import {
  Question,
  QuestionLabel,
  QuestionOption,
  QuestionOptions,
} from "./Question";
import RenderLatex from "./RenderLatex";
import { setSelectedIndex } from "../redux/reducers/examSlice";
const ExamPageContainer = styled.div`
  padding: 10px 20% 10px 20%;
  font-family: "Poppins", sans-serif;
  @media only screen and (max-width: 600px) {
    padding: 10px 0 65px 0;
  }
`;
const QuestionsHolder = styled.div``;
const QuestionWrapper = styled.div`
  margin: 20px 0;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
export default function ExamPage() {
  const examTime = 60 * 2;
  const time = new Date();
  // questions
  const { questions } = useSelector((state) => state.exam.value);
  time.setSeconds(time.getSeconds() + examTime);
  const dispatcher = useDispatch();
  const contentIndex = useContentIndex();
  useEffect(() => {
    if (contentIndex === 50) {
      dispatcher(disableContent(true));
    }
  }, [contentIndex, dispatcher]);
  const abcd = ["A", "B", "C", "D"];
  const elem = useSelector((state) => state.position.value);
  useEffect(() => {
    console.log(elem);
  }, [elem]);

  // time calc
  const now = new Date();
  const afterExam = new Date();
  afterExam.setSeconds(afterExam.getSeconds() + examTime);

  return (
    <ExamPageContainer>
      <ExamHeaderHolder>
        <h3>Quick exam - 15</h3>
        <MetaHolder>
          <TimeMetaHolder>Start: {now.toLocaleTimeString()}</TimeMetaHolder>
          <TimeMetaHolder>End: {afterExam.toLocaleTimeString()}</TimeMetaHolder>
        </MetaHolder>
      </ExamHeaderHolder>
      <TimerAndExitHolder>
        <Timer expiryTimestamp={time} onExpire={() => alert("Ok done!")} />
        <ExitButton
          onClick={() => {
            dispatcher(disableContent(false));
            dispatcher(setContentIndex(0));
            console.log(window.answerSheet);
          }}
        >
          Exit
        </ExitButton>
      </TimerAndExitHolder>
      <QuestionsHolder>
        {questions.map((question, i) => (
          <QuestionWrapper key={i}>
            <QuestionCountHolder>Question {i + 1}</QuestionCountHolder>
            <Question>
              <QuestionLabel>
                <RenderLatex latex={question.label} />
              </QuestionLabel>
              <QuestionOptions>
                {question.options.map((option, j) => (
                  <QuestionOption
                    id={j}
                    onOptionClick={() => {
                      dispatcher(
                        setSelectedIndex({ question, index: j + 1, questions })
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
      </QuestionsHolder>
    </ExamPageContainer>
  );
}
