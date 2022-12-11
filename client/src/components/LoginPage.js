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
import { updateTheme } from "../redux/reducers/themeSlice";
import Logo from "./Logo";
import { object, string } from "yup";
import axios from "../api/axios";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  font-family: "Poppins", sans-serif;
  background: ${(props) => props.theme.mainBg};
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
const Error = styled.div`
  width: 100%;
  margin-top: 15px;
  padding: 5px 0;
  font-size: 14px;
  color: red;
`;

const loginSchema = object({
  password: string().min(0, "Incorrect credentials!"),
  rollOrNumber: string().min(0, "Incorrect credentials!"),
});

export default function LoginPage() {
  // states and hooks
  const navigate = useNavigate();
  const theme = useTheme();
  const auth = useAuth();
  const dispatcher = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // effects
  // useEffect(() => {
  //   if (auth) navigate("/dashboard");
  //   else navigate("/login");
  // }, [auth, navigate]);

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  useEffect(() => {
    // enable local host user update
    //dispatcher(updateUser());
    // enable theme mode saving
    dispatcher(updateTheme());
  }, [dispatcher]);

  // handlers
  const handleSubmit = (e) => {
    // prevent default
    e.preventDefault();
    setIsSubmitting(true);
    console.log("cool");
    const test = { username, password };
    loginSchema
      .validate(test)
      .then(async () => {
        const { data } = await axios.post(`/api/user/login`, {
          username,
          password,
        });
        console.log(data);
        const user = {
          auth: true,
          name: data.name,
          id: data.id,
          username: data.username,
          role: data.role,
          token: data.token,
        };
        dispatcher(setUser(user));
        setIsSubmitting(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        setIsSubmitting(false);
        const error =
          typeof err?.response?.data.error === "object"
            ? err?.message
            : err?.response?.data.error;
        const msg = error;
        setError(msg);
      });
  };
  const handleTest = () => {
    dispatcher(
      setUser({
        auth: true,
        name: "Arb",
        id: "some-id",
        username: "arb",
        role: "admin",
        token: "test",
      })
    );
  };
  return (
    <Container theme={theme}>
      <Logo phone dim={150} />
      <LeftSide>
        <LeftSideContent>
          <Form id="login" onSubmit={handleSubmit}>
            <TitleText topMargin>Welcome to Flame!</TitleText>
            <GreyText>
              Practice with tons of real questions. Trust your goals. Real flame
              your skills.
            </GreyText>
            {error && <Error>{error}</Error>}
            <Input
              label="Username"
              placeholder="Enter your username"
              id="roll"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <Button onClick={handleTest}>Test</Button>
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
  );
}
