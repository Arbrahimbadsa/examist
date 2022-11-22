import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useDashboardQuestion from "../hooks/useDashboardQuestion";
import {
  setDashboardQuestion,
  setDashboardQuestionOption,
} from "../redux/reducers/dashboardQuestionSlice";
import { CardDotLine, CardHeader, Card } from "./Card";
import {
  Question,
  QuestionLabel,
  QuestionOption,
  QuestionOptions,
} from "./Question";
import IconButton from "./IconButton";
import { RefreshCcw } from "react-feather";
import RenderLatex from "./RenderLatex";
import axios from "axios";
import { HOST } from "../utils/hostname";

export default function QuickPractice() {
  const dispatcher = useDispatch();
  const {
    label,
    options,
    selectedIndex,
    correctIndex,
    touched,
    subject,
    chapter,
  } = useDashboardQuestion();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${HOST}/api/question/random`);
      dispatcher(
        setDashboardQuestion({
          ...data,
          correctIndex: data.correctAnswer,
          selectedIndex: null,
          touched: false,
        })
      );
    };
    getData();
  }, [dispatcher]);

  const handleOptionClick = (index) => {
    if (!touched) dispatcher(setDashboardQuestionOption(index));
  };
  const abcd = ["A", "B", "C", "D"];

  const handleRefresh = () => {
    const getData = async () => {
      const { data } = await axios.get(`${HOST}/api/question/random`);
      dispatcher(
        setDashboardQuestion({
          ...data,
          correctIndex: data.correctAnswer,
          selectedIndex: null,
          touched: false,
        })
      );
    };
    getData();
  };

  return (
    <Card>
      <CardHeader
        title="Quick Practice"
        actions={
          <>
            <IconButton margin="0" onClick={handleRefresh}>
              <RefreshCcw size={15} />
            </IconButton>
            {/* 
            // for future feature
            <IconButton margin="0 0 0 5px">
              <MoreVertical size={15} />
            </IconButton> */}
          </>
        }
      />
      <CardDotLine beforeDot={subject} afterDot={chapter} />
      <Question>
        <QuestionLabel>
          <RenderLatex latex={label} />
        </QuestionLabel>
        <QuestionOptions>
          {options &&
            options.map((option, i) => (
              <QuestionOption
                optionCount={abcd[i]}
                onOptionClick={() => handleOptionClick(i + 1)}
                key={i}
                label={option}
                selectedCorrect={
                  i + 1 === selectedIndex && selectedIndex === correctIndex
                }
                selectedInCorrect={
                  i + 1 === selectedIndex && selectedIndex !== correctIndex
                }
                touched={touched}
                changeCorrectBg={
                  touched &&
                  i + 1 === correctIndex &&
                  selectedIndex !== correctIndex
                }
                onlyOne={true}
              />
            ))}
        </QuestionOptions>
      </Question>
    </Card>
  );
}
