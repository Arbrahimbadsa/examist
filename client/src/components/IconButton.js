import { useSelector } from "react-redux";
import styled from "styled-components";
const IconButtonHolder = styled.div`
  height: auto;
  width: auto;
  padding: 5px;
  ${(props) => (props.clickable ? `cursor: pointer;` : null)}
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${(props) => (props.margin ? props.margin : "0 15px")};
  &:hover {
    ${(props) => (props.clickable ? `opacity: 0.5` : null)}
  }
`;

export default function IconButton({ children, margin, ...rest }) {
  const isExamStarted = useSelector((state) => state.isExamStarted.value);
  return (
    <IconButtonHolder clickable={!isExamStarted} margin={margin} {...rest}>
      {children}
    </IconButtonHolder>
  );
}
