import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useTheme from "../hooks/useTheme";
import { switchTheme } from "../redux/reducers/themeSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

export default function HomeScreen() {
  const dispatcher = useDispatch();
  const themeData = useTheme();
  const navigate = useNavigate();
  const auth = useAuth();
  const user = useUser();
  useEffect(() => {
    if (!auth) navigate("/login");
    else navigate("/dashboard");
  }, [navigate, auth]);
  return (
    auth && (
      <>
        <div>
          <h1 style={{ color: themeData.color }}>
            Counter: {user && user.name}
          </h1>
          <button onClick={() => dispatcher(switchTheme())}>
            Update theme
          </button>
        </div>
      </>
    )
  );
}
