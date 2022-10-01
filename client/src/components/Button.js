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
  display: block;
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;
export default function Button({ children, ...rest }) {
  const theme = useTheme();
  return (
    <StyledButton theme={theme} {...rest}>
      {children}
    </StyledButton>
  );
}
