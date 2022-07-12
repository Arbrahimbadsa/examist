import styled from "styled-components";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import GreyText from "./GreyText";
import TitleText from "./TitleText";
import Input from "./Input";
import Button from "./Button";
import useTheme from "../hooks/useTheme";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userSlice";
import { updateUser } from "../redux/reducers/userSlice";
import { updateTheme } from "../redux/reducers/themeSlice";
import Logo from "./Logo";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 2rem;
  background: #ebeef6;
  @media only screen and (max-width: 600px) {
    padding: 0;
    align-items: center;
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  height: 100%;
  width: 100%;
  background: #fff;
  border-radius: 20px 0 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px;
  @media only screen and (max-width: 600px) {
    height: auto;
    border-radius: 0;
    max-height: 500px;
  }
`;
const RightSide = styled.div`
  height: 100%;
  width: 100%;
  background: ${(props) => props.theme.loginPage.bg};
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 0 20px 20px 0;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
const BigText = styled.h1`
  font-weight: 800;
  font-size: 2.5rem;
  text-align: center;
`;
const LeftSideContent = styled.div`
  margin: 0 50px;
`;
const Form = styled.form`
  display: inline-block;
  width: auto;
  max-width: 300px;
`;

export default function LoginPage() {
  // states and hooks
  const navigate = useNavigate();
  const theme = useTheme();
  const auth = useAuth();
  const dispatcher = useDispatch();
  const [rollOrNumber, setRollOrNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // effects
  useEffect(() => {
    if (auth) navigate("/dashboard");
    else navigate("/login");
  }, [auth, navigate]);

  useEffect(() => {
    // enable local host user update
    dispatcher(updateUser());
    // enable theme mode saving
    dispatcher(updateTheme());
  }, [dispatcher]);

  // handlers
  const handleSubmit = (e) => {
    // prevent default
    // demo login
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const user = { auth: true, name: "Arb Rahim Badsa" };
      dispatcher(setUser(user));
    }, 3000);
  };
  return (
    !auth && (
      <Container>
        <Logo phone dim={150} />
        <LeftSide>
          <LeftSideContent>
            <Form id="login" onSubmit={handleSubmit}>
              <TitleText topMargin>Welcome to Flame!</TitleText>
              <GreyText>
                Practice with tons of real questions. Trust your goals. Real
                flame your skills.
              </GreyText>
              <Input
                label="Roll or Phone"
                placeholder="Enter your roll"
                id="roll"
                type="number"
                value={rollOrNumber}
                onChange={(e) => setRollOrNumber(e.target.value)}
                required
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit">
                {isSubmitting ? "Logging..." : "Login"}
              </Button>
              <Link to="/register">
                <GreyText>Click here to register.</GreyText>
              </Link>
            </Form>
          </LeftSideContent>
        </LeftSide>
        <RightSide theme={theme}>
          <Logo desktop dim={200} />
          <BigText>Flame . Your . Skills</BigText>
        </RightSide>
      </Container>
    )
  );
}
