import styled from "styled-components";
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
import { useEffect } from "react";
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
  @media only screen and (max-width: 600px) {
    border-radius: 0;
    max-height: 500px;
    padding-top: 25px;
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
export default function RegistrationPage() {
  const theme = useTheme();
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // effects
  useEffect(() => {
    if (auth) navigate("/dashboard");
    else navigate("/register");
  }, [auth, navigate]);

  useEffect(() => {
    //dispatcher(updateUser());
  }, [dispatcher]);

  // handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const user = { auth: true, name: "Arb Rahim Badsa" };
      dispatcher(setUser(user));
      setIsSubmitting(false);
    }, 3000);
  };
  return (
    !auth && (
      <Container>
        <Logo phone dim={150} />
        <LeftSide>
          <LeftSideContent>
            <Form id="register" onSubmit={handleSubmit}>
              <TitleText topMargin>Welcome to Flame!</TitleText>
              <GreyText>
                Practice with tons of real questions. Trust your goals. Real
                flame your skills.
              </GreyText>
              <Input
                label="Name"
                placeholder="Enter your name"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Phone"
                placeholder="+88"
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
              <Link to="/login">
                <GreyText>Click here to login.</GreyText>
              </Link>
            </Form>
          </LeftSideContent>
        </LeftSide>
        <RightSide theme={theme}>
          <Logo dim={200} desktop />
          <BigText>Flame . Your . Skills</BigText>
        </RightSide>
      </Container>
    )
  );
}
