import styled from "styled-components";
import useTheme from "../hooks/useTheme";
const Title = styled.h1`
  margin-top: ${(props) => (props.topMargin ? "50px" : "25px")};
  font-weight: 500;
  font-size: 25px;
  color: ${(props) => props.theme.loginPage.text};
  @media only screen and (max-width: 600px) {
    margin-top: 10px;
  }
`;
export default function TitleText({ children, topMargin }) {
  const theme = useTheme();
  return (
    <Title theme={theme} topMargin>
      {children}
    </Title>
  );
}
