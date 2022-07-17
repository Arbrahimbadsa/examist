import { useLayoutEffect } from "react";
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
export default function QuickPractice() {
  const dispatcher = useDispatch();
  const { label, options, selectedIndex, correctIndex, touched } =
    useDashboardQuestion();
  // effects
  useLayoutEffect(() => {
    const question = {
      label: "I am a question from server?",
      options: ["Who", "Is", "There", "For"],
      correctIndex: 0,
    };
    dispatcher(setDashboardQuestion(question));
  }, [dispatcher]);

  const handleOptionClick = (index) => {
    if (!touched) dispatcher(setDashboardQuestionOption(index));
  };
  return (
    <Card>
      <CardHeader>Quick Practice</CardHeader>
      <CardDotLine beforeDot="Chemistry" afterDot="Chapter One" />
      <Question>
        <QuestionLabel>{label}</QuestionLabel>
        <QuestionOptions>
          {options &&
            options.map((option, i) => (
              <QuestionOption
                onOptionClick={() => handleOptionClick(i)}
                key={i}
                label={option}
                selectedCorrect={
                  i === selectedIndex && selectedIndex === correctIndex
                }
                selectedInCorrect={
                  i === selectedIndex && selectedIndex !== correctIndex
                }
              />
            ))}
        </QuestionOptions>
      </Question>
    </Card>
  );
}
