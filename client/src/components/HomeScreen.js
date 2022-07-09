import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useTheme from "../hooks/useTheme";
import { switchTheme } from "../redux/reducers/themeSlice";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function HomeScreen() {
  const dispatcher = useDispatch();
  const themeData = useTheme();
  const navigate = useNavigate();
  const user = useUser();
  useEffect(() => {
    if (!user) navigate("/login");
    else navigate("/dashboard");
  }, [navigate, user]);
  return (
    user && (
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
