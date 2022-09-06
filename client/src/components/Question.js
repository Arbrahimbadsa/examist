import { useState } from "react";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import RenderLatex from "./RenderLatex";
const QuestionHolder = styled.div`
  height: auto;
  width: 100%;
`;
const QuestionLabelHolder = styled.p`
  font-size: 15px;
  margin: 12px 0;
  font-family: "Poppins", sans-serif;
`;
const QuestionOptionsHolder = styled.div`
  font-family: "Poppins", sans-serif;
  padding: 10px;
  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;
const OptionHolder = styled.div`
  padding: 15px 8px 10px 8px;
  color: #3e4d5c;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid #dae0e6;
  opacity: 0.8;
  @media only screen and (max-width: 600px) {
    padding: 10px 5px 10px 5px;
  }
`;
const OptionCount = styled.div`
  margin: 0 10px 0 0;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 1px solid #dae0e6;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.selectedCorrect
      ? "green"
      : props.selectedInCorrect
      ? "red"
      : props.theme.optionColor};
  ${(props) =>
    !props.touched &&
    `&:hover {
    opacity: 0.8;
  cursor: pointer;
  }`}
  ${(props) => (props.selected ? "background:  #94A6B8; color: #fff;" : null)}
`;
const DashboardOptionCount = styled.div`
  margin: 0 10px 0 0;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 1px solid #dae0e6;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.selectedCorrect
      ? "green"
      : props.selectedInCorrect
      ? "red"
      : props.theme.optionColor};
  ${(props) =>
    !props.touched &&
    `&:hover {
    opacity: 0.8;
  cursor: pointer;
  }`}
  ${(props) => props.changeCorrectBg && `background: green;`}
`;
const OptionTextWrapper = styled.div``;
export function QuestionOption({
  label,
  onOptionClick,
  selectedCorrect,
  selectedInCorrect,
  changeCorrectBg,
  touched,
  optionCount,
  id,
  onlyOne,
}) {
  const theme = useTheme();
  const [active, setActive] = useState(null);
  return (
    <OptionHolder>
      <div>
        {onlyOne ? (
          <DashboardOptionCount
            onClick={() => {
              if (!touched) {
                setActive(id);
                onOptionClick();
              }
            }}
            theme={theme}
            selectedCorrect={selectedCorrect}
            selectedInCorrect={selectedInCorrect}
            touched={touched}
            changeCorrectBg={changeCorrectBg}
          >
            {optionCount}
          </DashboardOptionCount>
        ) : (
          <OptionCount
            onClick={() => {
              if (!touched) {
                setActive(id);
                onOptionClick();
              }
            }}
            theme={theme}
            selectedCorrect={selectedCorrect}
            selectedInCorrect={selectedInCorrect}
            touched={touched}
            changeCorrectBg={changeCorrectBg}
            selected={id === active}
          >
            {optionCount}
          </OptionCount>
        )}
      </div>
      <OptionTextWrapper>
        <RenderLatex latex={label} />
      </OptionTextWrapper>
    </OptionHolder>
  );
}
export function QuestionLabel({ children }) {
  return <QuestionLabelHolder>{children}</QuestionLabelHolder>;
}
export function QuestionOptions({ children }) {
  return <QuestionOptionsHolder>{children}</QuestionOptionsHolder>;
}
export function Question({ children }) {
  return <QuestionHolder>{children}</QuestionHolder>;
}
