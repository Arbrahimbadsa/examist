import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
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
import { string, object } from "yup";
import axios from "../api/axios";
import { updateUser } from "../redux/reducers/userSlice";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #ebeef6;
  overflow-y: scroll;
  font-family: "Poppins", sans-serif;
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

const registrationSchema = object({
  name: string().min(3, "Name shoulbe at least 3 digits."),
  phone: string(),
  password: string().min(6, "Passwrod should be at least 6 digits."),
});

export default function RegistrationPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatcher(updateUser());
  }, [dispatcher]);

  // handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const test = { name, username, password };
    registrationSchema
      .validate(test)
      .then(async () => {
        const { data } = await axios.post(`/api/user/register`, {
          name,
          username,
          password,
        });
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
        setError(err.message);
        setIsSubmitting(false);
      });
  };
  return (
    <Container>
      <Logo phone dim={150} />
      <LeftSide>
        <LeftSideContent>
          <Form id="register" onSubmit={handleSubmit}>
            <TitleText topMargin>Welcome to Flame!</TitleText>
            <GreyText>
              Practice with tons of real questions. Trust your goals. Real flame
              your skills.
            </GreyText>
            {error && <Error>{error}</Error>}
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
              label="Username"
              placeholder="Enter your username"
              id="phone"
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
  );
}
