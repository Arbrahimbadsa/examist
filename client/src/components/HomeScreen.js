import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTheme } from "../redux/reducers/themeSlice";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout, updateUser } from "../redux/reducers/userSlice";
import Dashboard from "./Dashboard";
import axios from "axios";
import { HOST } from "../utils/hostname";
import useUser from "../hooks/useUser";

export default function HomeScreen() {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const user = useUser();

  // effects
  useEffect(() => {
    if (!auth) navigate("/login");
    const ifInDashboard = location.pathname.indexOf("dashboard") > -1;
    if (!ifInDashboard) navigate("dashboard");
  }, [navigate, auth, location]);

  useEffect(() => {
    if (user?.token) {
      const url = `${HOST}/api/user/verify`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then(({ data }) => {
          if (!data) {
            dispatcher(logout());
          }
        })
        .catch((err) => {
          dispatcher(logout());
        });
    }
    dispatcher(updateUser());
    dispatcher(updateTheme());
  }, [dispatcher]);

  return auth && <Dashboard />;
}
