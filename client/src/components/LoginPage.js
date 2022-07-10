import styled from "styled-components";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import GreyText from "./GreyText";
import TitleText from "./TitleText";
import Input from "./Input";
import Button from "./Button";
import useTheme from "../hooks/useTheme";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 2rem;
  background: #ebeef6;
`;
const LeftSide = styled.div`
  height: 100%;
  width: 100%;
  background: #fff;
  padding: 25px;
  border-radius: 20px 0 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const RightSide = styled.div`
  height: 100%;
  width: 100%;
  background: ${(props) => props.theme.loginPage.bg};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 0 20px 20px 0;
`;
const BigText = styled.h1`
  font-weight: 800;
  font-size: 2.5rem;
  text-align: center;
`;
const LeftSideContent = styled.div`
  margin: 0 50px;
`;
const LoginForm = styled.form`
  display: inline-block;
  width: auto;
  max-width: 300px;
`;
export default function LoginPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const auth = useAuth();
  useEffect(() => {
    if (auth) navigate("/dashboard");
    else navigate("/login");
  }, [auth, navigate]);
  return (
    !auth && (
      <Container>
        <LeftSide>
          <LeftSideContent>
            <LoginForm>
              <TitleText topMargin>Welcome back!</TitleText>
              <GreyText>
                Practice with tons of real questions. Trust your goals. Real
                flame your skills.
              </GreyText>
              <Input
                label="Roll"
                placeholder="Enter your roll"
                id="roll"
                type="number"
                required
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                id="password"
                type="password"
                required
              />
              <Button type="submit">Login</Button>
              <Link to="/register">
                <GreyText>Click here to register.</GreyText>
              </Link>
            </LoginForm>
          </LeftSideContent>
        </LeftSide>
        <RightSide theme={theme}>
          <BigText>Flame . Your . Skills</BigText>
        </RightSide>
      </Container>
    )
  );
}
