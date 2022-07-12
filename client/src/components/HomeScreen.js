import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTheme } from "../redux/reducers/themeSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { updateUser } from "../redux/reducers/userSlice";
import Dashboard from "./Dashboard";

export default function HomeScreen() {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();

  // effects
  useEffect(() => {
    if (!auth) navigate("/login");
    else navigate("/dashboard");
  }, [navigate, auth]);

  useEffect(() => {
    dispatcher(updateUser());
    dispatcher(updateTheme());
  }, [dispatcher]);

  return auth && <Dashboard />;
}
