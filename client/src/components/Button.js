import styled from "styled-components";
import useTheme from "../hooks/useTheme";
const StyledButton = styled.button`
  height: 40px;
  width: 300px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) => props.theme.loginPage.bg};
  color: #fff;
  margin-bottom: 10px;
`;
export default function Button({ children, ...rest }) {
  const theme = useTheme();
  return (
    <StyledButton theme={theme} {...rest}>
      {children}
    </StyledButton>
  );
}
