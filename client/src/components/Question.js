import styled from "styled-components";
import useTheme from "../hooks/useTheme";
const QuestionHolder = styled.div`
  height: auto;
  width: 100%;
`;
const QuestionLabelHolder = styled.p`
  font-size: 15px;
  margin: 12px 0;
`;
const QuestionOptionsHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;
const OptionHolder = styled.div`
  background: ${(props) =>
    props.selectedCorrect
      ? "green"
      : props.selectedInCorrect
      ? "red"
      : props.theme.optionColor};
  padding: 5px;
  color: #fff;
  cursor: pointer;
  text-align: center;
  border-radius: 3px;
  &:hover {
    opacity: 0.8;
  }
`;
export function QuestionOption({
  label,
  onOptionClick,
  selectedCorrect,
  selectedInCorrect,
}) {
  const theme = useTheme();
  return (
    <OptionHolder
      onClick={onOptionClick}
      theme={theme}
      selectedCorrect={selectedCorrect}
      selectedInCorrect={selectedInCorrect}
    >
      {label}
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
