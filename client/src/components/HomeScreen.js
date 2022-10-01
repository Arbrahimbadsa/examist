import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTheme } from "../redux/reducers/themeSlice";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { updateUser } from "../redux/reducers/userSlice";
import Dashboard from "./Dashboard";

export default function HomeScreen() {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  // effects
  useEffect(() => {
    if (!auth) navigate("/login");
    const ifInDashboard = location.pathname.indexOf("dashboard") > -1;
    if (!ifInDashboard) navigate("dashboard");
  }, [navigate, auth, location]);

  useEffect(() => {
    dispatcher(updateUser());
    dispatcher(updateTheme());
  }, [dispatcher]);

  return auth && <Dashboard />;
}
