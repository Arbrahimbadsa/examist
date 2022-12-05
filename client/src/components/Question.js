import { useState } from "react";
import { Check } from "react-feather";
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
      ? "#FF0400"
      : props.theme.optionColor};
  ${(props) =>
    !props.touched &&
    `&:hover {
    opacity: 0.8;
  cursor: pointer;
  }`}
  ${(props) => (props.selected ? "background:  #94A6B8; color: #fff;" : null)}
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
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
      ? "#26D95F"
      : props.selectedInCorrect
      ? "#FF0400"
      : props.theme.optionColor};
  color: ${(props) =>
    props.selectedCorrect ? "#fff" : props.selectedInCorrect ? "#fff" : "#000"};
  ${(props) =>
    !props.touched &&
    `&:hover {
    opacity: 0.8;
  cursor: pointer;
  }`}
  ${(props) => props.changeCorrectBg && `background: #26D95F; color: #fff;`}
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
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
            {changeCorrectBg || selectedCorrect ? (
              <Check color="#fff" size={20} />
            ) : (
              optionCount
            )}
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
      <OptionTextWrapper style={{ color: theme.textColor }}>
        <RenderLatex latex={label} />
      </OptionTextWrapper>
    </OptionHolder>
  );
}
export function QuestionLabel({ children }) {
  const theme = useTheme();
  return (
    <QuestionLabelHolder style={{ color: theme.textColor }}>
      {children}
    </QuestionLabelHolder>
  );
}
export function QuestionOptions({ children }) {
  return <QuestionOptionsHolder>{children}</QuestionOptionsHolder>;
}
export function Question({ children }) {
  return <QuestionHolder>{children}</QuestionHolder>;
}
