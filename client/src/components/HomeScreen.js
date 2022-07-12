import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useTheme from "../hooks/useTheme";
import { switchTheme, updateTheme } from "../redux/reducers/themeSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { logout, updateUser } from "../redux/reducers/userSlice";
import Button from "./Button";

export default function HomeScreen() {
  const dispatcher = useDispatch();
  const themeData = useTheme();
  const navigate = useNavigate();
  const auth = useAuth();
  const user = useUser();

  // effects
  useEffect(() => {
    if (!auth) navigate("/login");
    else navigate("/dashboard");
  }, [navigate, auth]);

  useEffect(() => {
    dispatcher(updateUser());
    dispatcher(updateTheme());
  }, [dispatcher]);

  return (
    auth && (
      <>
        <div>
          <h1 style={{ color: themeData.color }}>
            Welcome to dashboard, {user && user.name}.
          </h1>
          <Button onClick={() => dispatcher(switchTheme())}>
            Update theme
          </Button>
          <Button onClick={() => dispatcher(logout())}>Logout</Button>
        </div>
      </>
    )
  );
}
