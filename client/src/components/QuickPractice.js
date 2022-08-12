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
import IconButton from "./IconButton";
import { RefreshCcw } from "react-feather";
import { getRandomQuestion } from "../helpers/getDashboardQuestion";
import RenderLatex from "./RenderLatex";

export default function QuickPractice() {
  const dispatcher = useDispatch();
  const { label, options, selectedIndex, correctIndex, touched } =
    useDashboardQuestion();
  // effects
  useLayoutEffect(() => {
    const question = {
      label: String.raw`Calculate the value of -  $**\int ^{\infty }_{0}\dfrac{xdx}{1+x^{4}}**$ and this would render and if $*x = 5*$ then find the value of this. $**(x+y) / 3 = 5**$`,
      options: [
        String.raw`$**\int ^{\infty }_{0}\dfrac{xdx}{1+x^{4}}**$`,
        "For",
        "Nothing",
        "Lmao",
      ],
      correctIndex: 0,
    };
    dispatcher(setDashboardQuestion(question));
  }, [dispatcher]);

  const handleOptionClick = (index) => {
    if (!touched) dispatcher(setDashboardQuestionOption(index));
  };
  return (
    <Card>
      <CardHeader
        title="Quick Practice"
        actions={
          <>
            <IconButton
              margin="0"
              onClick={() =>
                dispatcher(setDashboardQuestion(getRandomQuestion()))
              }
            >
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
      <CardDotLine beforeDot="Chemistry" afterDot="Chapter One" />
      <Question>
        <QuestionLabel>
          <RenderLatex latex={label} />
        </QuestionLabel>
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
                touched={touched}
                changeCorrectBg={
                  touched &&
                  i === correctIndex &&
                  selectedIndex !== correctIndex
                }
              />
            ))}
        </QuestionOptions>
      </Question>
    </Card>
  );
}
